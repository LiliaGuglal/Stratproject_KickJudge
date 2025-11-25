'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, RotateCcw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Message } from '@/components/chat/types';
import { cn } from '@/lib/utils';

interface MiniChatWidgetProps {
  onClose: () => void;
}

const MAX_CHARACTERS = 500;
const MIN_CHARACTERS = 3;

export function MiniChatWidget({ onClose }: MiniChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<string | null>(null);

  // Add welcome message on mount
  useEffect(() => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Вітаю! Я допоможу вам з питаннями про правила кікбоксингу. Задайте своє питання.',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    const content = inputValue.trim();

    // Validate message length
    if (content.length < MIN_CHARACTERS) {
      setError('Питання має містити щонайменше 3 символи');
      return;
    }

    if (content.length > MAX_CHARACTERS) {
      setError('Питання має містити не більше 500 символів');
      return;
    }

    lastMessageRef.current = content;
    
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/rules-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Помилка API');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      const assistantMessageId = crypto.randomUUID();
      let assistantContent = '';

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
        },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: assistantContent, isStreaming: true }
              : msg
          )
        );
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Сталася помилка';
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClear = () => {
    const welcomeMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'Вітаю! Я допоможу вам з питаннями про правила кікбоксингу. Задайте своє питання.',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setError(null);
  };

  const characterCount = inputValue.length;
  const isOverLimit = characterCount > MAX_CHARACTERS;
  const canSend = inputValue.trim().length >= MIN_CHARACTERS && !isOverLimit && !isLoading;

  return (
    <Card className="fixed bottom-24 right-8 w-96 h-[500px] shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary">
            <MessageCircle className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold">Правила кікбоксингу</h3>
            <p className="text-xs text-muted-foreground">Задайте питання</p>
          </div>
        </div>
        <div className="flex gap-2">
          {messages.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClear}
              disabled={isLoading}
              title="Очистити розмову"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                'max-w-[80%] rounded-lg px-4 py-2 text-sm',
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted'
              )}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              {message.isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Banner */}
      {error && (
        <div className="px-4 py-2 bg-destructive/10 border-t border-destructive/20">
          <p className="text-xs text-destructive">{error}</p>
        </div>
      )}

      {/* Input */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ваше питання..."
            className={cn(
              'flex-1 min-h-[60px] max-h-[100px] resize-none rounded-md border bg-background px-3 py-2 text-sm',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isOverLimit && 'border-destructive focus-visible:ring-destructive'
            )}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!canSend}
            size="icon"
            className="self-end"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-end mt-1">
          <span
            className={cn(
              'text-xs',
              isOverLimit ? 'text-destructive font-medium' : 'text-muted-foreground'
            )}
          >
            {characterCount}/{MAX_CHARACTERS}
          </span>
        </div>
      </div>
    </Card>
  );
}
