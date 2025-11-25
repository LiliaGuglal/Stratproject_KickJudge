'use client';

import { Message } from './types';
import { MessageBubble } from './message-bubble';
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="max-w-md space-y-2">
          <h3 className="text-lg font-semibold text-white">
            Start a conversation
          </h3>
          <p className="text-sm text-zinc-400">
            Send a message to begin chatting with the AI assistant.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="flex items-center gap-2 text-zinc-400">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">AI is typing...</span>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
