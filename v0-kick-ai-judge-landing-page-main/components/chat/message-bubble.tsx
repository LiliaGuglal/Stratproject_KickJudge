'use client';

import { Message } from './types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div
      className={cn(
        'flex w-full gap-3 group',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'flex flex-col max-w-[80%] gap-1',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-lg px-4 py-2 break-words',
            isUser
              ? 'bg-white text-black'
              : 'bg-zinc-800 text-white'
          )}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs text-zinc-500">
            {formatTime(message.timestamp)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800"
            aria-label="Copy message"
          >
            {copied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
