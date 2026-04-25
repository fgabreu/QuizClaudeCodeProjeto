import { describe, it, expect } from "vitest";
import { calculateScore, getMotivationalMessage, formatTime, calculateByCategory } from "@/lib/scoring";
import type { Answer, Question } from "@/types/quiz";

const makeAnswer = (isCorrect: boolean): Answer => ({
  questionId: "q-001",
  selected: isCorrect,
  isCorrect,
});

describe("calculateScore", () => {
  it("returns 0 for no correct answers", () => {
    expect(calculateScore([makeAnswer(false), makeAnswer(false)])).toBe(0);
  });

  it("returns 10 per correct answer", () => {
    expect(calculateScore([makeAnswer(true), makeAnswer(false), makeAnswer(true)])).toBe(20);
  });

  it("returns 100 for 10 correct answers", () => {
    expect(calculateScore(Array.from({ length: 10 }, () => makeAnswer(true)))).toBe(100);
  });
});

describe("getMotivationalMessage", () => {
  it("returns beginner message for score <= 40", () => {
    expect(getMotivationalMessage(0)).toContain("revisar");
    expect(getMotivationalMessage(40)).toContain("revisar");
  });

  it("returns intermediate message for score 41-70", () => {
    expect(getMotivationalMessage(41)).toContain("base");
    expect(getMotivationalMessage(70)).toContain("base");
  });

  it("returns advanced message for score 71-90", () => {
    expect(getMotivationalMessage(71)).toContain("Excelente");
    expect(getMotivationalMessage(90)).toContain("Excelente");
  });

  it("returns expert message for score >= 91", () => {
    expect(getMotivationalMessage(91)).toContain("especialista");
    expect(getMotivationalMessage(100)).toContain("especialista");
  });
});

describe("formatTime", () => {
  it("formats seconds only", () => {
    expect(formatTime(30000)).toBe("30s");
    expect(formatTime(5000)).toBe("5s");
  });

  it("formats minutes and seconds", () => {
    expect(formatTime(90000)).toBe("1m 30s");
    expect(formatTime(125000)).toBe("2m 05s");
  });

  it("formats zero", () => {
    expect(formatTime(0)).toBe("0s");
  });
});

describe("calculateByCategory", () => {
  const questions: Question[] = [
    { id: "q1", track: "iniciante", category: "modelos", statement: "Q1", answer: true, explanation: "E1", difficulty_weight: 1 },
    { id: "q2", track: "iniciante", category: "modelos", statement: "Q2", answer: false, explanation: "E2", difficulty_weight: 1 },
    { id: "q3", track: "iniciante", category: "pricing", statement: "Q3", answer: true, explanation: "E3", difficulty_weight: 1 },
  ];

  it("counts correct and total per category", () => {
    const answers: Answer[] = [
      { questionId: "q1", selected: true, isCorrect: true },
      { questionId: "q2", selected: true, isCorrect: false },
      { questionId: "q3", selected: true, isCorrect: true },
    ];
    const result = calculateByCategory(questions, answers);
    expect(result.modelos).toEqual({ correct: 1, total: 2 });
    expect(result.pricing).toEqual({ correct: 1, total: 1 });
  });
});
