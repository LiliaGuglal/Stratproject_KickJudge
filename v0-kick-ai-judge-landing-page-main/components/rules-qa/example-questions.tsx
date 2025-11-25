'use client';

import { Card } from '@/components/ui/card';

export interface ExampleQuestion {
  id: string;
  text: string;
  category: 'scoring' | 'fouls' | 'techniques' | 'general';
}

interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const exampleQuestions: ExampleQuestion[] = [
  {
    id: '1',
    text: 'Які удари дозволені в кікбоксингу?',
    category: 'techniques',
  },
  {
    id: '2',
    text: 'Як нараховуються бали в поінт-файтингу WAKO?',
    category: 'scoring',
  },
  {
    id: '3',
    text: 'Які найпоширеніші фоли та їх покарання?',
    category: 'fouls',
  },
  {
    id: '4',
    text: 'Чи можна використовувати удари колінами в голову?',
    category: 'techniques',
  },
  {
    id: '5',
    text: 'Що станеться, якщо я вийду за межі рингу?',
    category: 'fouls',
  },
  {
    id: '6',
    text: 'Як визначається переможець раунду?',
    category: 'scoring',
  },
];

const categoryColors = {
  scoring: 'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950',
  fouls: 'hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950',
  techniques: 'hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950',
  general: 'hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950',
};

export function ExampleQuestions({ onQuestionClick }: ExampleQuestionsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4">Приклади питань</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {exampleQuestions.map((question) => (
          <Card
            key={question.id}
            className={`p-4 cursor-pointer transition-all border-2 border-transparent ${
              categoryColors[question.category]
            }`}
            onClick={() => onQuestionClick(question.text)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onQuestionClick(question.text);
              }
            }}
            aria-label={`Приклад питання: ${question.text}`}
          >
            <p className="text-sm">{question.text}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
