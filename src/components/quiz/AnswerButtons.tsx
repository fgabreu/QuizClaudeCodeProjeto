"use client";

import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Answer } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface AnswerButtonsProps {
  onAnswer: (selected: boolean) => void;
  lastAnswer: Answer | null;
  correctAnswer?: boolean;
  disabled: boolean;
}

export function AnswerButtons({
  onAnswer,
  lastAnswer,
  correctAnswer,
  disabled,
}: AnswerButtonsProps) {
  useEffect(() => {
    if (disabled) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "v" || e.key === "V" || e.key === "ArrowLeft") onAnswer(true);
      if (e.key === "f" || e.key === "F" || e.key === "ArrowRight") onAnswer(false);
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [disabled, onAnswer]);

  function getVariant(value: boolean) {
    if (!lastAnswer) return "outline";
    if (lastAnswer.selected === value) {
      return lastAnswer.isCorrect ? "correct" : "incorrect";
    }
    if (correctAnswer === value) return "correct";
    return "outline";
  }

  return (
    <div
      className="flex w-full flex-col gap-3 sm:flex-row"
      role="group"
      aria-labelledby="question-statement"
    >
      <Button
        variant={getVariant(true) as "correct" | "incorrect" | "outline"}
        size="xl"
        className={cn("flex-1 gap-2 text-base font-semibold")}
        onClick={() => onAnswer(true)}
        disabled={disabled}
        aria-label="Verdadeiro (V)"
      >
        <Check className="h-5 w-5" aria-hidden="true" />
        Verdadeiro
        <span className="ml-auto hidden text-xs opacity-60 sm:inline">V</span>
      </Button>

      <Button
        variant={getVariant(false) as "correct" | "incorrect" | "outline"}
        size="xl"
        className={cn("flex-1 gap-2 text-base font-semibold")}
        onClick={() => onAnswer(false)}
        disabled={disabled}
        aria-label="Falso (F)"
      >
        <X className="h-5 w-5" aria-hidden="true" />
        Falso
        <span className="ml-auto hidden text-xs opacity-60 sm:inline">F</span>
      </Button>
    </div>
  );
}
