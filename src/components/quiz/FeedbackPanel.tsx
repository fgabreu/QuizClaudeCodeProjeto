"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Answer, Question } from "@/types/quiz";

interface FeedbackPanelProps {
  answer: Answer;
  question: Question;
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackPanel({ answer, question, onNext, isLast }: FeedbackPanelProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Enter") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNext]);

  return (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="flex items-start gap-3">
          {answer.isCorrect ? (
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" aria-hidden="true" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
          )}
          <div className="flex-1">
            <p className="text-sm font-semibold text-[var(--fg)]">
              {answer.isCorrect ? "Correto!" : "Incorreto!"}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-[var(--fg-muted)]">
              {question.explanation}
            </p>
            {question.reference_url && (
              <a
                href={question.reference_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--color-primary)] hover:underline"
              >
                Saiba mais
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button onClick={onNext} size="sm" className="gap-1.5">
            {isLast ? "Ver resultado" : "Próxima"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="ml-1 hidden text-xs opacity-70 sm:inline">Enter</span>
          </Button>
        </div>
    </motion.div>
  );
}
