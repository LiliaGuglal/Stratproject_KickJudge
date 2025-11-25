# Design Document: Competition Rules Q&A System

## Overview

The Competition Rules Q&A System provides a specialized interface for users to ask questions about kickboxing competition rules and receive accurate, contextual answers. The system leverages the existing Gemini chatbot infrastructure but with a focused system prompt and dedicated user interface optimized for rule queries.

The design reuses existing chat components and API infrastructure while adding rule-specific customizations including example questions, rule citations, and a disclaimer about consulting official rulebooks.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     User Browser                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Any Page (Landing, Pricing, Demo, etc.)              │ │
│  │  └─ FloatingChatButton (fixed position)               │ │
│  │     - Redirects to /rules-qa on click                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  /rules-qa Page (Next.js)                              │ │
│  │  ├─ Page Header & Description                          │ │
│  │  ├─ Example Questions                                  │ │
│  │  ├─ RulesQAChatInterface Component                     │ │
│  │  │  ├─ MessageList (reused)                            │ │
│  │  │  ├─ MessageInput (reused)                           │ │
│  │  │  └─ ErrorBanner (reused)                            │ │
│  │  └─ Rulebook Link & Disclaimer                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP POST /api/rules-chat
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Next.js API Routes                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  /api/rules-chat/route.ts                              │ │
│  │  ├─ Request Validation (3-500 chars)                   │ │
│  │  ├─ Rules-Specific System Prompt                       │ │
│  │  ├─ Gemini API Client                                  │ │
│  │  └─ Streaming Response Handler                         │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Gemini API Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Google Gemini 1.5 Flash API                     │
│  - Processes rule questions with specialized context        │
│  - Returns streaming responses with rule citations          │
└─────────────────────────────────────────────────────────────┘
```

### Component Reuse Strategy

The design maximizes code reuse from the existing gemini-chatbot implementation:

**Reused Components:**
- `components/chat/message-bubble.tsx` - Display messages
- `components/chat/message-list.tsx` - Render conversation history
- `components/chat/message-input.tsx` - User input field
- `components/chat/error-banner.tsx` - Error display
- `components/chat/types.ts` - TypeScript interfaces

**New Components:**
- `components/rules-qa/rules-chat-interface.tsx` - Wrapper with rules-specific features
- `components/rules-qa/example-questions.tsx` - Clickable example questions
- `components/rules-qa/rules-disclaimer.tsx` - Legal disclaimer component
- `components/rules-qa/floating-chat-button.tsx` - Fixed position button for global access

**New API Route:**
- `app/api/rules-chat/route.ts` - Dedicated endpoint with rules-focused system prompt

## Components and Interfaces

### 1. Rules Q&A Page (`app/rules-qa/page.tsx`)

**Purpose:** Main page component that renders the rules Q&A interface

**Structure:**
```typescript
export default function RulesQAPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <header>
        <h1>Competition Rules Q&A</h1>
        <p>Ask questions about kickboxing competition rules</p>
      </header>

      {/* Example Questions */}
      <ExampleQuestions />

      {/* Chat Interface */}
      <RulesQAChatInterface />

      {/* Disclaimer & Rulebook Link */}
      <RulesDisclaimer />
    </div>
  );
}
```

**Responsive Design:**
- Mobile: Single column, full-width chat
- Tablet: Centered with max-width 768px
- Desktop: Centered with max-width 1024px

### 2. Example Questions Component (`components/rules-qa/example-questions.tsx`)

**Purpose:** Display clickable example questions to help users get started

**Interface:**
```typescript
interface ExampleQuestion {
  id: string;
  text: string;
  category: 'scoring' | 'fouls' | 'techniques' | 'general';
}

interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}
```

**Example Questions:**
- "What strikes are legal in kickboxing?"
- "How is scoring calculated in WAKO point fighting?"
- "What are common fouls and their penalties?"
- "Can I use knee strikes to the head?"
- "What happens if I step out of the ring?"

**Styling:**
- Grid layout (2 columns on mobile, 3 on desktop)
- Card-based design with hover effects
- Category color coding

### 3. Rules Chat Interface Component (`components/rules-qa/rules-chat-interface.tsx`)

**Purpose:** Specialized chat interface for rules questions

**Key Differences from General Chat:**
- Uses `/api/rules-chat` endpoint instead of `/api/chat`
- Shorter character limit (500 vs 2000)
- Minimum 3 characters instead of 1
- Pre-populated with welcome message
- Integration with example questions

**State Management:**
```typescript
interface RulesQAChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  inputValue: string;
}
```

**Methods:**
- `handleSendMessage(message: string)` - Send user question
- `handleExampleClick(question: string)` - Auto-fill from example
- `handleClearConversation()` - Reset chat history
- `handleRetry()` - Retry failed request

### 4. Rules Disclaimer Component (`components/rules-qa/rules-disclaimer.tsx`)

**Purpose:** Display legal disclaimer and link to official rulebook

**Content:**
```typescript
interface RulesDisclaimerProps {
  rulebookUrl?: string;
}
```

**Text:**
- "This Q&A system provides informational guidance based on standard kickboxing regulations."
- "For official and authoritative rule interpretations, please consult the official WAKO rulebook."
- Link to download/view official rulebook PDF

**Styling:**
- Subtle background color
- Icon for information/warning
- Prominent rulebook download button

### 5. Floating Chat Button Component (`components/rules-qa/floating-chat-button.tsx`)

**Purpose:** Provide global access to rules Q&A from any page

**Interface:**
```typescript
interface FloatingChatButtonProps {
  position?: 'bottom-right' | 'bottom-left';
  offset?: { bottom: number; right: number; left: number };
}
```

**Behavior:**
- Fixed position button visible on all pages
- Redirects to `/rules-qa` when clicked
- Smooth hover and click animations
- Accessible with keyboard navigation
- Hidden on `/rules-qa` page itself (no need when already on chat page)

**Styling:**
- Circular button with chat/message icon
- Primary brand color background
- White icon color
- Drop shadow for depth
- Pulse animation to draw attention
- Z-index high enough to float above content
- Responsive sizing (smaller on mobile)

**Default Position:**
- Bottom-right corner
- 24px from bottom on mobile
- 32px from bottom on desktop
- 24px from right on mobile
- 32px from right on desktop

**Icon:**
- Use `MessageCircle` or `MessageSquare` from lucide-react
- Size: 24px on mobile, 28px on desktop

**Accessibility:**
- ARIA label: "Ask about competition rules"
- Keyboard accessible (Tab navigation)
- Focus visible state
- Tooltip on hover: "Competition Rules Q&A"

### 6. API Route (`app/api/rules-chat/route.ts`)

**Purpose:** Handle rules-specific chat requests with specialized system prompt

**Request Interface:**
```typescript
interface RulesChatRequest {
  message: string;
}
```

**Response:** Streaming text response (same as existing chat API)

**System Prompt:**
```typescript
const RULES_SYSTEM_PROMPT = `You are a knowledgeable assistant specializing in kickboxing competition rules and regulations. Your role is to:

1. Answer questions about kickboxing rules clearly and accurately
2. Focus on WAKO (World Association of Kickboxing Organizations) regulations
3. Provide rule citations when applicable (e.g., "According to WAKO Rule 3.2...")
4. Explain the reasoning behind rules, not just state them
5. Give practical examples of rule applications
6. Clarify common misconceptions about rules
7. Decline to answer questions unrelated to competition rules politely

Key areas you cover:
- Legal strikes and techniques
- Scoring systems (point fighting, continuous fighting)
- Fouls and penalties
- Ring boundaries and out-of-bounds rules
- Safety equipment requirements
- Weight classes and divisions
- Match duration and rounds

Always respond in Ukrainian language. Be concise but thorough. If a rule has exceptions or varies by division, explain these clearly.

If you don't know a specific rule detail, acknowledge this and recommend consulting the official WAKO rulebook.`;
```

**Validation:**
- Message length: 3-500 characters
- Required field validation
- Same error handling as existing chat API

**Configuration:**
```typescript
const model = genAI.getGenerativeModel({
  model: 'models/gemini-1.5-flash',
  generationConfig: {
    temperature: 0.5,  // Lower for more consistent rule answers
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 1500,  // Shorter responses for rules
  },
  safetySettings: [/* same as existing */]
});
```

## Data Models

### Message Interface (Reused)

```typescript
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}
```

### Example Question Model

```typescript
interface ExampleQuestion {
  id: string;
  text: string;
  category: 'scoring' | 'fouls' | 'techniques' | 'general';
}
```

### API Error Response (Reused)

```typescript
interface ErrorResponse {
  error: string;
}
```

## Error Handling

### Client-Side Errors

**Validation Errors:**
- Empty message: "Please enter a question"
- Too short (< 3 chars): "Question must be at least 3 characters"
- Too long (> 500 chars): "Question must be 500 characters or less"

**Network Errors:**
- Display error banner with retry button
- Preserve user's question for retry
- Show "Service temporarily unavailable" message

**API Errors:**
- 400: "Unable to process question. Please rephrase."
- 429: "Too many questions. Please wait a moment."
- 500: "Service error. Please try again."
- 503: "Service temporarily unavailable. Please try again later."

### Server-Side Errors

**Same error handling as existing chat API:**
- Missing API key → 500 error
- Content safety violation → 400 error
- Rate limiting → 429 error
- Network errors → 503 error
- All errors logged to console

## Testing Strategy

### Manual Testing Checklist

**Functional Testing:**
1. Submit various rule questions and verify accurate responses
2. Test example question click-through
3. Verify conversation history maintains context
4. Test clear conversation functionality
5. Verify character limit enforcement (3-500 chars)
6. Test streaming response display
7. Verify rule citations appear in responses
8. Test disclaimer and rulebook link

**Error Scenario Testing:**
1. Test with invalid API key
2. Test with network disconnection
3. Test rate limiting behavior
4. Test with very short questions (< 3 chars)
5. Test with very long questions (> 500 chars)
6. Test retry functionality after errors

**Responsive Design Testing:**
1. Test on mobile devices (320px - 768px)
2. Test on tablets (768px - 1024px)
3. Test on desktop (1024px+)
4. Verify example questions grid layout
5. Test chat interface scrolling

**Cross-Browser Testing:**
1. Chrome/Edge (Chromium)
2. Firefox
3. Safari (if available)

### Integration Testing

**API Integration:**
1. Verify `/api/rules-chat` endpoint responds correctly
2. Test streaming response handling
3. Verify system prompt is applied correctly
4. Test error responses match expected format

**Component Integration:**
1. Verify example questions populate input correctly
2. Test message list updates with streaming responses
3. Verify error banner displays on failures
4. Test clear conversation resets state

## Implementation Notes

### Code Organization

```
v0-kick-ai-judge-landing-page-main/
├── app/
│   ├── layout.tsx                      # Add FloatingChatButton here
│   ├── rules-qa/
│   │   └── page.tsx                    # Main rules Q&A page
│   └── api/
│       └── rules-chat/
│           └── route.ts                # Rules-specific API endpoint
├── components/
│   ├── chat/                           # Existing reusable components
│   │   ├── message-bubble.tsx
│   │   ├── message-list.tsx
│   │   ├── message-input.tsx
│   │   ├── error-banner.tsx
│   │   └── types.ts
│   └── rules-qa/                       # New rules-specific components
│       ├── rules-chat-interface.tsx
│       ├── example-questions.tsx
│       ├── rules-disclaimer.tsx
│       └── floating-chat-button.tsx    # Global floating button
```

### Styling Approach

- Use Tailwind CSS for consistency with existing design
- Reuse Radix UI components (Button, Card, ScrollArea)
- Match color scheme from existing pages
- Use existing typography scale
- Ensure dark mode compatibility

### Performance Considerations

- Lazy load rules Q&A page (Next.js automatic code splitting)
- Reuse existing chat components (no duplication)
- Stream responses for perceived performance
- Minimize API calls (no unnecessary requests)
- Cache example questions (static data)

### Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for example questions
- Screen reader friendly error messages
- Sufficient color contrast ratios

### Internationalization

- Primary language: Ukrainian (matching existing chat)
- System prompt in English (for Gemini API)
- UI text in Ukrainian
- Example questions in Ukrainian
- Error messages in Ukrainian

## Design Decisions and Rationales

### Decision 1: Separate API Endpoint

**Decision:** Create `/api/rules-chat` instead of modifying `/api/chat`

**Rationale:**
- Allows different system prompts for different use cases
- Enables different validation rules (character limits)
- Maintains separation of concerns
- Easier to monitor and debug rule-specific issues
- Can apply different rate limits if needed

### Decision 2: Reuse Chat Components

**Decision:** Reuse existing chat UI components with minimal modifications

**Rationale:**
- Reduces code duplication
- Maintains consistent user experience
- Faster development time
- Easier maintenance (bug fixes apply to both)
- Proven components (already tested)

### Decision 3: Lower Temperature for Rules

**Decision:** Use temperature 0.5 instead of 0.7 for rules chatbot

**Rationale:**
- Rules require more consistent, factual responses
- Lower temperature reduces creative variation
- Improves accuracy for rule citations
- More predictable behavior for legal/regulatory content

### Decision 4: Shorter Character Limit

**Decision:** 500 character limit instead of 2000 for questions

**Rationale:**
- Rule questions are typically concise
- Encourages focused, specific questions
- Faster processing and response times
- Reduces token usage and costs
- Better user experience (shorter = clearer)

### Decision 5: Example Questions

**Decision:** Include clickable example questions on the page

**Rationale:**
- Helps users understand what to ask
- Reduces friction for first-time users
- Demonstrates system capabilities
- Improves engagement and usage
- Common UX pattern for Q&A systems

### Decision 6: Prominent Disclaimer

**Decision:** Display disclaimer about consulting official rulebook

**Rationale:**
- Legal protection (AI can make mistakes)
- Sets appropriate expectations
- Encourages verification of critical information
- Professional and responsible approach
- Builds trust with users

### Decision 7: Floating Chat Button

**Decision:** Add a fixed-position floating button on all pages that redirects to `/rules-qa`

**Rationale:**
- Provides easy access from anywhere in the application
- Common UX pattern for chat/support features
- Increases discoverability of rules Q&A feature
- Non-intrusive (small, corner placement)
- Improves user engagement
- Familiar pattern users expect from modern web apps

## Future Enhancements

**Potential improvements not in current scope:**

1. **Rule Search:** Add search functionality for specific rule numbers
2. **Conversation Persistence:** Save conversation history across sessions
3. **Rule Categories:** Filter questions by category (scoring, fouls, etc.)
4. **Multilingual Support:** Add English language option
5. **Rule Updates:** Notification system for rule changes
6. **Admin Dashboard:** Track common questions and improve responses
7. **Feedback System:** Allow users to rate answer quality
8. **Related Questions:** Suggest related rule topics after answers
9. **PDF Integration:** Direct rule citations with PDF page links
10. **Voice Input:** Allow voice questions for mobile users
