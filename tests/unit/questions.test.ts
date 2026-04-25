import { describe, it, expect } from "vitest";
import { getQuestionsByTrack, shuffleQuestions } from "@/lib/questions";
import type { Track } from "@/types/quiz";

const TRACKS: Track[] = ["iniciante", "intermediario", "avancado"];

describe("getQuestionsByTrack", () => {
  it("returns only questions for the given track", () => {
    for (const track of TRACKS) {
      const questions = getQuestionsByTrack(track);
      expect(questions.length).toBeGreaterThanOrEqual(10);
      expect(questions.every((q) => q.track === track)).toBe(true);
    }
  });
});

describe("shuffleQuestions", () => {
  it("returns the same number of questions", () => {
    const questions = getQuestionsByTrack("intermediario");
    const shuffled = shuffleQuestions(questions);
    expect(shuffled.length).toBe(questions.length);
  });

  it("contains all original questions", () => {
    const questions = getQuestionsByTrack("iniciante");
    const shuffled = shuffleQuestions(questions);
    const originalIds = new Set(questions.map((q) => q.id));
    const shuffledIds = new Set(shuffled.map((q) => q.id));
    expect(shuffledIds).toEqual(originalIds);
  });

  it("does not repeat questions within a session of 10", () => {
    const questions = getQuestionsByTrack("avancado");
    const shuffled = shuffleQuestions(questions).slice(0, 10);
    const ids = shuffled.map((q) => q.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it("avoids 3+ consecutive same-category questions", () => {
    const questions = getQuestionsByTrack("iniciante");
    const shuffled = shuffleQuestions(questions);

    for (let i = 2; i < shuffled.length; i++) {
      const a = shuffled[i - 2].category;
      const b = shuffled[i - 1].category;
      const c = shuffled[i].category;
      expect(a === b && b === c).toBe(false);
    }
  });
});
