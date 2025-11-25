'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MiniChatWidget } from './mini-chat-widget';

interface FloatingChatButtonProps {
  position?: 'bottom-right' | 'bottom-left';
  offset?: { bottom: number; right?: number; left?: number };
}

export function FloatingChatButton({
  position = 'bottom-right',
  offset = { bottom: 32, right: 32, left: 32 },
}: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide button on rules-qa page
  if (pathname === '/rules-qa') {
    return null;
  }

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const positionClasses =
    position === 'bottom-right'
      ? `bottom-[${offset.bottom}px] right-[${offset.right}px]`
      : `bottom-[${offset.bottom}px] left-[${offset.left}px]`;

  return (
    <>
      <Button
        onClick={handleToggle}
        className={`fixed ${positionClasses} z-50 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
          !isOpen ? 'animate-pulse hover:animate-none' : ''
        } md:h-16 md:w-16`}
        size="icon"
        aria-label="Ask about competition rules"
        title="Competition Rules Q&A"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      </Button>

      {isOpen && <MiniChatWidget onClose={handleClose} />}
    </>
  );
}
