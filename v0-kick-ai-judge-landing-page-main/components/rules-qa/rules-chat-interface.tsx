'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from '@/components/chat/types';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { ErrorBanner } from '@/components/chat/error-banner';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RulesChatInterfaceProps {
  className?: string;
  onExampleClick?: (question: string) => void;
}

const MAX_CHARACTERS = 500;
const MIN_CHARACTERS = 3;

export function RulesChatInterface({ className, onExampleClick }: RulesChatInterfaceProps) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  
  const [inputValue, setInputValue] = useState('');
  const lastMessageRef = useRef<string | null>(null);

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Вітаю! Я допоможу вам з питаннями про правила кікбоксингу. Задайте своє питання або оберіть один з прикладів вище.',
      timestamp: new Date(),
    };
    
    setChatState((prev) => ({
      ...prev,
      messages: [welcomeMessage],
    }));
  }, []);

  const handleSendMessage = async (content: string) => {
    // Validate message length
    if (content.length < MIN_CHARACTERS) {
      setChatState((prev) => ({
        ...prev,
        error: 'Питання має містити щонайменше 3 символи',
      }));
      return;
    }

    if (content.length > MAX_CHARACTERS) {
      setChatState((prev) => ({
        ...prev,
        error: 'Питання має містити не більше 500 символів',
      }));
      return;
    }

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

    // Clear input value
    setInputValue('');

    try {
      // Call rules-specific API route
      const response = await fetch('/api/rules-chat', {
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
      const errorMessage = error instanceof Error ? error.message : 'Сталася помилка';
      
      setChatState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  const handleExampleClickInternal = (question: string) => {
    setInputValue(question);
    if (onExampleClick) {
      onExampleClick(question);
    }
  };

  const handleClearConversation = () => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Вітаю! Я допоможу вам з питаннями про правила кікбоксингу. Задайте своє питання або оберіть один з прикладів вище.',
      timestamp: new Date(),
    };
    
    setChatState({
      messages: [welcomeMessage],
      isLoading: false,
      error: null,
    });
    setInputValue('');
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
    <div className={cn('flex flex-col', className)}>
      {/* Clear conversation button */}
      {chatState.messages.length > 1 && (
        <div className="flex justify-end mb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearConversation}
            disabled={chatState.isLoading}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Очистити розмову
          </Button>
        </div>
      )}

      <div
        className={cn(
          'flex flex-col h-full max-h-[600px] border rounded-lg shadow-sm'
        )}
      >
        <div className="flex-1 overflow-y-auto">
          <MessageList
            messages={chatState.messages}
            isLoading={chatState.isLoading}
          />
        </div>
        
        {/* Error Banner */}
        {chatState.error && (
          <div className="px-4 py-3 border-t">
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
          maxCharacters={MAX_CHARACTERS}
          minCharacters={MIN_CHARACTERS}
          value={inputValue}
          onChange={setInputValue}
        />
      </div>
    </div>
  );
}
