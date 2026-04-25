"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { AnswerButtons } from "@/components/quiz/AnswerButtons";
import { FeedbackPanel } from "@/components/quiz/FeedbackPanel";
import { ResultScreen } from "@/components/quiz/ResultScreen";
import { useQuiz } from "@/hooks/useQuiz";
import { isValidTrack } from "@/lib/tracks";
import type { Track } from "@/types/quiz";

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const trackParam = params.track as string;
  const { state, currentQuestion, lastAnswer, startQuiz, answer, nextQuestion, reset } =
    useQuiz();

  useEffect(() => {
    if (!isValidTrack(trackParam)) {
      router.replace("/");
      return;
    }
    if (state.phase === "idle") {
      startQuiz(trackParam as Track);
    }
  }, [trackParam, state.phase, startQuiz, router]);

  function handleExit() {
    if (
      state.phase === "in-progress" &&
      window.confirm("Sair agora vai perder seu progresso. Deseja continuar?")
    ) {
      router.push("/");
    } else if (state.phase !== "in-progress") {
      router.push("/");
    }
  }

  function handleRetry() {
    reset();
    // useEffect detecta phase=idle e inicia o quiz automaticamente
  }

  if (state.phase === "finished") {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-4">
          <span className="text-sm font-medium text-[var(--fg-muted)]">Claude Code Quiz</span>
          <ThemeToggle />
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-8">
          <div className="w-full max-w-lg">
            <ResultScreen result={state.result} onRetry={handleRetry} />
          </div>
        </main>
      </div>
    );
  }

  if (state.phase !== "in-progress" || !currentQuestion) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-[var(--fg-muted)]">Carregando...</p>
      </div>
    );
  }

  const { currentIndex, questions, showFeedback } = state;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center gap-4 px-6 py-4">
        <div className="flex-1">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
        </div>
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExit}
          aria-label="Sair do quiz"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="flex w-full max-w-lg flex-col gap-8">
          <QuestionCard question={currentQuestion} questionNumber={currentIndex + 1} />

          <AnswerButtons
            onAnswer={answer}
            lastAnswer={lastAnswer}
            correctAnswer={showFeedback ? currentQuestion.answer : undefined}
            disabled={showFeedback}
          />

          <AnimatePresence>
            {showFeedback && lastAnswer && (
              <FeedbackPanel
                answer={lastAnswer}
                question={currentQuestion}
                onNext={nextQuestion}
                isLast={currentIndex === questions.length - 1}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
