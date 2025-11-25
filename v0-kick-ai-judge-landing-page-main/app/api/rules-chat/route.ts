import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini API client
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is not configured in environment variables');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Request body interface
interface RulesChatRequest {
  message: string;
}

// Rules-specific system prompt
const RULES_SYSTEM_PROMPT = `Ти — експертний помічник зі знанням правил кікбоксингу. Твоя роль:

1. Відповідати на питання про правила кікбоксингу чітко та точно
2. Фокусуватися на регламенті WAKO (Всесвітня асоціація кікбоксингу)
3. Надавати посилання на правила, коли це можливо (наприклад, "Згідно з правилом WAKO 3.2...")
4. Пояснювати логіку правил, а не лише їх формулювання
5. Давати практичні приклади застосування правил
6. Роз'яснювати поширені непорозуміння щодо правил
7. Ввічливо відмовлятися відповідати на питання, не пов'язані з правилами змагань

Основні теми, які ти висвітлюєш:
- Дозволені удари та техніки
- Системи оцінювання (поінт-файтінг, безперервний бій)
- Фоли та покарання
- Межі рингу та правила виходу за межі
- Вимоги до захисного спорядження
- Вагові категорії та дивізіони
- Тривалість поєдинку та раунди

Завжди відповідай українською мовою. Будь стислим, але ґрунтовним. Якщо правило має винятки або відрізняється залежно від дивізіону, поясни це чітко.

Якщо ти не знаєш конкретної деталі правила, визнай це та порекомендуй звернутися до офіційного регламенту WAKO.`;

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
    const body: RulesChatRequest = await req.json();
    const { message } = body;

    // Validate message length (3-500 characters)
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (message.length < 3 || message.length > 500) {
      return NextResponse.json(
        { error: 'Message must be between 3-500 characters' },
        { status: 400 }
      );
    }

    // Configure Gemini 2.5 Flash model with generation parameters
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash',
      generationConfig: {
        temperature: 0.5,  // Lower for more consistent rule answers
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1500,  // Shorter responses for rules
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
    const fullPrompt = `${RULES_SYSTEM_PROMPT}\n\nПитання користувача: ${message}`;

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
