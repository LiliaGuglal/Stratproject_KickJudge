'use client';

import { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  maxCharacters?: number;
  minCharacters?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const DEFAULT_MAX_CHARACTERS = 2000;

export function MessageInput({
  onSendMessage,
  disabled = false,
  isLoading = false,
  maxCharacters = DEFAULT_MAX_CHARACTERS,
  minCharacters = 1,
  value: controlledValue,
  onChange: controlledOnChange,
}: MessageInputProps) {
  const [internalMessage, setInternalMessage] = useState('');
  
  // Use controlled value if provided, otherwise use internal state
  const message = controlledValue !== undefined ? controlledValue : internalMessage;
  const setMessage = controlledOnChange !== undefined ? controlledOnChange : setInternalMessage;

  const characterCount = message.length;
  const isOverLimit = characterCount > maxCharacters;
  const canSend = message.trim().length > 0 && !isOverLimit && !disabled && !isLoading;

  const handleSend = () => {
    if (canSend) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMessage(newValue);
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <textarea
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            placeholder="Type your message... (Shift+Enter for new line)"
            className={cn(
              'flex-1 min-h-[80px] max-h-[200px] resize-none rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-white',
              'text-sm placeholder:text-zinc-500',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
              'disabled:cursor-not-allowed disabled:opacity-50',
              isOverLimit && 'border-red-500 focus-visible:ring-red-500'
            )}
            aria-label="Message input"
            aria-invalid={isOverLimit}
          />
          <Button
            onClick={handleSend}
            disabled={!canSend}
            size="icon"
            className="self-end bg-white text-black hover:bg-zinc-200"
            aria-label="Send message"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-xs text-zinc-500">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span
            className={cn(
              'text-xs',
              isOverLimit ? 'text-red-500 font-medium' : 'text-zinc-500'
            )}
          >
            {characterCount}/{maxCharacters}
          </span>
        </div>
      </div>
    </div>
  );
}
