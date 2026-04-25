import { memo } from "react";
import type { Question } from "@/types/quiz";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
}

export const QuestionCard = memo(function QuestionCard({ question, questionNumber }: QuestionCardProps) {
  return (
    <div className="flex flex-col items-center gap-4 px-2 text-center">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-primary)]">
        Pergunta {questionNumber}
      </p>
      <p
        className="font-serif text-xl font-medium leading-relaxed text-[var(--fg)] md:text-2xl"
        id="question-statement"
      >
        {question.statement}
      </p>
    </div>
  );
});
