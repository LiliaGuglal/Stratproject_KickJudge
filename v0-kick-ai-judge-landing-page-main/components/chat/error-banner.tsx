'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorBannerProps {
  error: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

// Map error messages to user-friendly messages and determine if retry is available
function getErrorDetails(error: string): {
  message: string;
  canRetry: boolean;
  icon: 'error' | 'warning';
} {
  const errorLower = error.toLowerCase();

  // API configuration errors (500) - matches "API configuration error"
  if (errorLower.includes('api configuration error')) {
    return {
      message: 'The chatbot service is currently unavailable. Please contact support.',
      canRetry: false,
      icon: 'error',
    };
  }

  // Network errors (503) - matches "Service temporarily unavailable"
  if (errorLower.includes('service temporarily unavailable')) {
    return {
      message: 'Unable to connect to the service. Please check your connection and try again.',
      canRetry: true,
      icon: 'warning',
    };
  }

  // Content safety violations (400) - matches "Message violates content policy"
  if (errorLower.includes('violates content policy')) {
    return {
      message: 'Your message violates our content policy. Please rephrase and try again.',
      canRetry: false,
      icon: 'warning',
    };
  }

  // Rate limiting (429) - matches "Too many requests, please wait"
  if (errorLower.includes('too many requests')) {
    return {
      message: 'Too many requests. Please wait a moment before trying again.',
      canRetry: true,
      icon: 'warning',
    };
  }

  // Invalid input (400) - matches "Message must be between 1-2000 characters"
  if (errorLower.includes('must be between')) {
    return {
      message: 'Your message must be between 1 and 2000 characters.',
      canRetry: false,
      icon: 'warning',
    };
  }

  // Message required validation (400) - matches "Message is required and must be a string"
  if (errorLower.includes('message is required')) {
    return {
      message: 'Please enter a message.',
      canRetry: false,
      icon: 'warning',
    };
  }

  // Streaming errors - matches errors from stream controller
  if (errorLower.includes('invalid api key')) {
    return {
      message: 'The chatbot service is currently unavailable. Please contact support.',
      canRetry: false,
      icon: 'error',
    };
  }

  if (errorLower.includes('content safety violation')) {
    return {
      message: 'Your message violates our content policy. Please rephrase and try again.',
      canRetry: false,
      icon: 'warning',
    };
  }

  if (errorLower.includes('rate limit exceeded')) {
    return {
      message: 'Too many requests. Please wait a moment before trying again.',
      canRetry: true,
      icon: 'warning',
    };
  }

  // No response body error
  if (errorLower.includes('no response body')) {
    return {
      message: 'Unable to receive response from the service. Please try again.',
      canRetry: true,
      icon: 'warning',
    };
  }

  // Generic API errors with status codes
  if (errorLower.includes('api error:')) {
    return {
      message: 'An error occurred while communicating with the service. Please try again.',
      canRetry: true,
      icon: 'warning',
    };
  }

  // Generic error
  return {
    message: 'An unexpected error occurred. Please try again.',
    canRetry: true,
    icon: 'error',
  };
}

export function ErrorBanner({
  error,
  onRetry,
  onDismiss,
  className,
}: ErrorBannerProps) {
  const { message, canRetry, icon } = getErrorDetails(error);

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 border rounded-lg',
        icon === 'error'
          ? 'bg-red-950/50 border-red-900 text-red-200'
          : 'bg-yellow-950/50 border-yellow-900 text-yellow-200',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="size-5 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{message}</p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {canRetry && onRetry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRetry}
            className={cn(
              'h-8 px-3 text-xs',
              icon === 'error'
                ? 'text-red-200 hover:text-red-100 hover:bg-red-900/50'
                : 'text-yellow-200 hover:text-yellow-100 hover:bg-yellow-900/50'
            )}
          >
            <RefreshCw className="size-3 mr-1" />
            Retry
          </Button>
        )}
        
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className={cn(
              'h-8 w-8',
              icon === 'error'
                ? 'text-red-200 hover:text-red-100 hover:bg-red-900/50'
                : 'text-yellow-200 hover:text-yellow-100 hover:bg-yellow-900/50'
            )}
            aria-label="Dismiss error"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
