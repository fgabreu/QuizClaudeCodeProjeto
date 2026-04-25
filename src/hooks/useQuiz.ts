"use client";

import { useReducer, useCallback } from "react";
import type { Track, Question, Answer, QuizResult } from "@/types/quiz";
import { getQuestionsByTrack, shuffleQuestions } from "@/lib/questions";
import { buildQuizResult } from "@/lib/scoring";

type QuizState =
  | { phase: "idle" }
  | {
      phase: "in-progress";
      track: Track;
      questions: Question[];
      answers: Answer[];
      currentIndex: number;
      showFeedback: boolean;
      startedAt: number;
    }
  | { phase: "finished"; result: QuizResult };

type QuizAction =
  | { type: "START_QUIZ"; track: Track; questions: Question[] }
  | { type: "ANSWER"; selected: boolean }
  | { type: "NEXT_QUESTION" }
  | { type: "RESET" };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "START_QUIZ":
      return {
        phase: "in-progress",
        track: action.track,
        questions: action.questions,
        answers: [],
        currentIndex: 0,
        showFeedback: false,
        startedAt: Date.now(),
      };

    case "ANSWER": {
      if (state.phase !== "in-progress") return state;
      const question = state.questions[state.currentIndex];
      const newAnswer: Answer = {
        questionId: question.id,
        selected: action.selected,
        isCorrect: action.selected === question.answer,
      };
      return { ...state, answers: [...state.answers, newAnswer], showFeedback: true };
    }

    case "NEXT_QUESTION": {
      if (state.phase !== "in-progress") return state;
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.questions.length) {
        const result = buildQuizResult(
          state.track,
          state.questions,
          state.answers,
          state.startedAt,
          Date.now()
        );
        return { phase: "finished", result };
      }
      return { ...state, currentIndex: nextIndex, showFeedback: false };
    }

    case "RESET":
      return { phase: "idle" };

    default:
      return state;
  }
}

export function useQuiz() {
  const [state, dispatch] = useReducer(quizReducer, { phase: "idle" });

  const startQuiz = useCallback((track: Track) => {
    const all = getQuestionsByTrack(track);
    const questions = shuffleQuestions(all).slice(0, 10);
    dispatch({ type: "START_QUIZ", track, questions });
  }, []);

  const answer = useCallback((selected: boolean) => {
    dispatch({ type: "ANSWER", selected });
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: "NEXT_QUESTION" });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const currentQuestion =
    state.phase === "in-progress" ? state.questions[state.currentIndex] : null;

  const lastAnswer =
    state.phase === "in-progress" && state.showFeedback
      ? state.answers[state.answers.length - 1]
      : null;

  return { state, currentQuestion, lastAnswer, startQuiz, answer, nextQuestion, reset };
}
