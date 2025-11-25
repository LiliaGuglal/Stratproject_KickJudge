'use client';

import { useState, useRef } from 'react';
import { Message, ChatState } from './types';
import { MessageList } from './message-list';
import { MessageInput } from './message-input';
import { ErrorBanner } from './error-banner';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  
  // Store the last message for retry functionality
  const lastMessageRef = useRef<string | null>(null);

  const handleSendMessage = async (content: string) => {
    // Store message for retry functionality
    lastMessageRef.current = content;
    
    // Create user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    // Add user message to state and clear any previous errors
    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      // Call API route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `API error: ${response.status} ${response.statusText}`
        );
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      // Create assistant message
      const assistantMessageId = crypto.randomUUID();
      let assistantContent = '';

      setChatState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            id: assistantMessageId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
            isStreaming: true,
          },
        ],
      }));

      // Read stream
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        // Update assistant message with new content
        setChatState((prev) => ({
          ...prev,
          messages: prev.messages.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: assistantContent, isStreaming: true }
              : msg
          ),
        }));
      }

      // Mark streaming as complete
      setChatState((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, isStreaming: false }
            : msg
        ),
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const handleRetry = () => {
    if (lastMessageRef.current) {
      handleSendMessage(lastMessageRef.current);
    }
  };

  const handleDismissError = () => {
    setChatState((prev) => ({
      ...prev,
      error: null,
    }));
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full max-h-[600px] border border-zinc-800 rounded-lg bg-zinc-950 shadow-sm',
        className
      )}
    >
      <div className="flex-1 overflow-y-auto bg-black">
        <MessageList
          messages={chatState.messages}
          isLoading={chatState.isLoading}
        />
      </div>
      
      {/* Error Banner */}
      {chatState.error && (
        <div className="px-4 py-3 border-t border-zinc-800">
          <ErrorBanner
            error={chatState.error}
            onRetry={handleRetry}
            onDismiss={handleDismissError}
          />
        </div>
      )}
      
      <MessageInput
        onSendMessage={handleSendMessage}
        disabled={chatState.isLoading}
        isLoading={chatState.isLoading}
      />
    </div>
  );
}
