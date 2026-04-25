import type { Answer, Question, QuizResult, Track, Category } from "@/types/quiz";

const POINTS_PER_CORRECT = 10;

export function calculateScore(answers: Answer[]): number {
  return answers.filter((a) => a.isCorrect).length * POINTS_PER_CORRECT;
}

export function calculateByCategory(
  questions: Question[],
  answers: Answer[]
): Partial<Record<Category, { correct: number; total: number }>> {
  const result: Partial<Record<Category, { correct: number; total: number }>> = {};

  for (const question of questions) {
    const answer = answers.find((a) => a.questionId === question.id);
    if (!result[question.category]) {
      result[question.category] = { correct: 0, total: 0 };
    }
    result[question.category]!.total++;
    if (answer?.isCorrect) {
      result[question.category]!.correct++;
    }
  }

  return result;
}

export function buildQuizResult(
  track: Track,
  questions: Question[],
  answers: Answer[],
  startedAt: number,
  finishedAt: number
): QuizResult {
  return {
    track,
    score: calculateScore(answers),
    totalTime: finishedAt - startedAt,
    byCategory: calculateByCategory(questions, answers),
  };
}

export function getMotivationalMessage(score: number): string {
  if (score <= 40) return "Bom começo! Vale revisar a documentação oficial.";
  if (score <= 70) return "Você tem boa base. Que tal a trilha avançada?";
  if (score <= 90) return "Excelente domínio!";
  return "Você é um especialista em Claude Code! 🎉";
}

export function getScoreColorClass(score: number): string {
  if (score >= 91) return "text-emerald-500";
  if (score >= 71) return "text-[var(--color-primary)]";
  if (score >= 41) return "text-amber-500";
  return "text-red-500";
}

export function getScoreColorHex(score: number): string {
  if (score >= 91) return "#10b981";
  if (score >= 71) return "#cc785c";
  if (score >= 41) return "#f59e0b";
  return "#ef4444";
}

export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds.toString().padStart(2, "0")}s`;
}
