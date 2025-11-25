import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not configured in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Request body interface
interface ChatRequest {
  message: string;
  conversationHistory?: Array<{
    role: 'user' | 'model';
    parts: string;
  }>;
}

// System prompt with WAKO scoring rules
const SYSTEM_CONTEXT = `Ти — експертний АІ-суддя з кікбоксингу (проект KickAI). 
Твоя задача: відповідати на питання про правила, суддівство та оцінювання ударів згідно з правилами WAKO.
Відповідай українською мовою, професійно, коротко і по суті.

СИСТЕМА ОЦІНЮВАННЯ WAKO:

1. POINT FIGHTING (Поінт-файтінг):
- Удар рукою (голова/корпус): 1 бал
- Удар ногою в корпус: 1 бал
- Підсічка (Foot sweep): 1 бал
- Удар ногою в голову: 2 бали
- Удар ногою в корпус у стрибку: 2 бали
- Удар ногою в голову у стрибку: 3 бали
- Бій зупиняється після кожного влучання
- При розриві 10 балів - достроковий TKO

2. БЕЗПЕРЕРВНІ ДИСЦИПЛІНИ (Light, Kick Light, Full Contact, Low Kick, K-1):
- 1 ефективний удар = 1 бал на клікері
- Бій не зупиняється після удару
- Критерії зарахування: дозволена зона, чистота, сила, баланс
- Переможець раунду: 10:9 (або 10:8 при домінуванні/нокдауні)

3. ШТРАФНІ САНКЦІЇ:
- Виходи за межі (татамі): 1-й - попередження, 2-й/3-й - мінус 1 бал, 4-й - дискваліфікація
- Фоли (удари нижче пояса, відкритою рукавичкою, пасивність): попередження або мінус бал`;

export async function POST(req: NextRequest) {
  try {
    // Validate API key
    if (!apiKey || !genAI) {
      console.error('API configuration error: Missing or invalid API key');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Parse request body
    const body: ChatRequest = await req.json();
    const { message } = body;

    // Validate message length (1-2000 characters)
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length < 1 || message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 1-2000 characters' },
        { status: 400 }
      );
    }

    // Configure Gemini 1.5 Flash model with generation parameters
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Create full prompt with system context
    const fullPrompt = `${SYSTEM_CONTEXT}\n\nПитання користувача: ${message}`;

    // Generate streaming response
    const result = await model.generateContentStream(fullPrompt);

    // Create a ReadableStream for streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        } catch (error: any) {
          console.error('Streaming error:', error);

          // Handle specific error types
          if (error.message?.includes('API key')) {
            controller.error(new Error('Invalid API key'));
          } else if (error.message?.includes('safety')) {
            controller.error(new Error('Content safety violation'));
          } else if (error.message?.includes('quota') || error.message?.includes('rate limit')) {
            controller.error(new Error('Rate limit exceeded'));
          } else {
            controller.error(error);
          }
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error: any) {
    console.error('API Route Error:', error);

    // Handle missing/invalid API key errors
    if (error.message?.includes('API key') || error.message?.includes('authentication')) {
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Handle content safety violations
    if (error.message?.includes('safety') || error.message?.includes('blocked')) {
      return NextResponse.json(
        { error: 'Message violates content policy' },
        { status: 400 }
      );
    }

    // Handle rate limiting
    if (error.message?.includes('quota') || error.message?.includes('rate limit') || error.message?.includes('429')) {
      return NextResponse.json(
        { error: 'Too many requests, please wait' },
        { status: 429 }
      );
    }

    // Handle network errors
    if (error.message?.includes('network') || error.message?.includes('ECONNREFUSED') || error.message?.includes('fetch')) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Generic error handler
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}