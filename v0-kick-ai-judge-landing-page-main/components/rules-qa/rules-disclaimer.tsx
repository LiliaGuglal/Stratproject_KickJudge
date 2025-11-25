'use client';

import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface RulesDisclaimerProps {
  rulebookUrl?: string;
}

export function RulesDisclaimer({ rulebookUrl = 'https://wakoweb.com/rules/' }: RulesDisclaimerProps) {
  return (
    <Card className="mt-8 p-6 bg-muted/50">
      <div className="flex items-start gap-4">
        <Info className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Важлива інформація</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ця система Q&A надає інформаційні рекомендації на основі стандартних правил кікбоксингу.
            Для офіційних та авторитетних тлумачень правил, будь ласка, зверніться до офіційного регламенту WAKO.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(rulebookUrl, '_blank')}
            aria-label="Відкрити офіційний регламент WAKO"
          >
            Переглянути офіційний регламент WAKO
          </Button>
        </div>
      </div>
    </Card>
  );
}
