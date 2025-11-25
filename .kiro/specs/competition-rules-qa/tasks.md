# Implementation Plan

- [x] 1. Create API route for rules-specific chat


  - Create app/api/rules-chat/route.ts file
  - Implement POST handler with rules-focused system prompt
  - Configure Gemini 1.5 Flash model with temperature 0.5 and maxOutputTokens 1500
  - Add request validation for message length (3-500 characters)
  - Implement streaming response functionality
  - Add comprehensive error handling (same patterns as existing /api/chat)
  - _Requirements: 2.1, 2.2, 2.3, 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.2, 8.4_



- [ ] 2. Create example questions component
  - Create components/rules-qa/example-questions.tsx
  - Define ExampleQuestion interface with id, text, and category fields
  - Implement grid layout (2 columns mobile, 3 columns desktop)
  - Add 5-6 example questions covering scoring, fouls, techniques, and general rules
  - Implement click handler to populate question in chat input
  - Style with card design, hover effects, and category color coding


  - Ensure responsive design and accessibility
  - _Requirements: 1.1, 7.2, 7.5_

- [x] 3. Create rules disclaimer component


  - Create components/rules-qa/rules-disclaimer.tsx
  - Add informational text about consulting official rulebook
  - Include link/button to download official WAKO rulebook
  - Style with subtle background, information icon, and prominent CTA button
  - Ensure responsive layout
  - _Requirements: 3.4, 7.3_




- [ ] 4. Create floating chat button component
  - Create components/rules-qa/floating-chat-button.tsx
  - Implement fixed position button (bottom-right corner by default)
  - Add MessageCircle icon from lucide-react
  - Implement redirect to /rules-qa using Next.js router
  - Add logic to hide button when already on /rules-qa page
  - Style with circular design, drop shadow, and pulse animation
  - Implement responsive sizing (smaller on mobile)
  - Add hover and focus states
  - Ensure keyboard accessibility with ARIA labels
  - Add tooltip on hover


  - _Requirements: 7.1, 7.5_

- [ ] 5. Create rules chat interface component
  - Create components/rules-qa/rules-chat-interface.tsx
  - Reuse Message interface from components/chat/types.ts
  - Implement state management for messages, loading, error, and input
  - Create handleSendMessage function that calls /api/rules-chat endpoint
  - Implement streaming response handling
  - Add handleExampleClick function to auto-fill input from example questions
  - Add handleClearConversation function to reset chat
  - Add handleRetry function for failed requests
  - Integrate MessageList component from components/chat/message-list.tsx
  - Integrate MessageInput component with 500 character limit and 3 character minimum


  - Integrate ErrorBanner component from components/chat/error-banner.tsx
  - Add welcome message on component mount
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5, 8.1, 8.3, 8.5_

- [ ] 6. Create rules Q&A page
  - Create app/rules-qa/page.tsx
  - Add page header with title "Competition Rules Q&A" and description
  - Integrate ExampleQuestions component with click handler
  - Integrate RulesQAChatInterface component


  - Integrate RulesDisclaimer component at bottom
  - Apply responsive layout (container with max-width)
  - Style with consistent spacing and typography
  - Ensure mobile, tablet, and desktop responsive design
  - _Requirements: 1.1, 7.1, 7.2, 7.3, 7.4, 7.5_



- [ ] 7. Integrate floating button into application layout
  - Open app/layout.tsx
  - Import FloatingChatButton component
  - Add FloatingChatButton to layout (outside main content area)
  - Ensure button appears on all pages except /rules-qa
  - Test button visibility and positioning across different pages
  - _Requirements: 7.1, 7.5_

- [ ] 8. Manual testing and validation
  - [ ] 8.1 Test rules Q&A functionality
    - Navigate to /rules-qa page
    - Submit various rule questions and verify accurate responses
    - Test example question click-through
    - Verify conversation history maintains context
    - Test clear conversation functionality
    - Verify character limit enforcement (3-500 chars)
    - Test streaming response display
    - Verify responses include rule citations and explanations
    - Test disclaimer and rulebook link
    - _Requirements: All_
  
  - [ ] 8.2 Test floating chat button
    - Verify button appears on landing page, pricing, demo pages
    - Verify button is hidden on /rules-qa page
    - Test button click redirects to /rules-qa
    - Test button hover and focus states
    - Verify tooltip displays on hover
    - Test keyboard navigation (Tab to button, Enter to activate)
    - _Requirements: 7.1, 7.5_
  
  - [ ] 8.3 Test error scenarios
    - Test with invalid API key (if possible in dev environment)
    - Test with network disconnection
    - Test with very short questions (< 3 chars)
    - Test with very long questions (> 500 chars)
    - Test retry functionality after errors
    - Verify error messages display correctly
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ] 8.4 Test responsive design
    - Test on mobile devices (320px - 768px)
    - Test on tablets (768px - 1024px)
    - Test on desktop (1024px+)
    - Verify example questions grid layout adapts
    - Verify chat interface scrolling works
    - Verify floating button size and position on different screens
    - _Requirements: 7.5_
  
  - [ ]* 8.5 Test cross-browser compatibility
    - Test in Chrome/Edge
    - Test in Firefox
    - Test in Safari (if available)
    - Verify streaming works in all browsers
    - Verify button animations work in all browsers
    - _Requirements: All_
