'use client';

import { useState } from 'react';
import { ExampleQuestions } from '@/components/rules-qa/example-questions';
import { RulesChatInterface } from '@/components/rules-qa/rules-chat-interface';
import { RulesDisclaimer } from '@/components/rules-qa/rules-disclaimer';

export default function RulesQAPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Page Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Питання та відповіді про правила змагань
        </h1>
        <p className="text-muted-foreground text-lg">
          Задайте питання про правила кікбоксингу та отримайте швидку відповідь
        </p>
      </header>

      {/* Example Questions */}
      <ExampleQuestions onQuestionClick={handleQuestionClick} />

      {/* Chat Interface */}
      <RulesChatInterface
        className="mb-8"
        onExampleClick={handleQuestionClick}
      />

      {/* Disclaimer & Rulebook Link */}
      <RulesDisclaimer />
    </div>
  );
}
