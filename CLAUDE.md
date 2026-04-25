# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Educational True/False quiz web app about Claude Code (CLI, Agent SDK, ecosystem). Three difficulty tracks (Iniciante, Intermediário, Avançado), 10 shuffled questions per session, immediate feedback with explanations, and social sharing of results.

The full product spec lives in `prd.md`.

## Commands

```bash
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run lint         # ESLint
npm run format       # Prettier
npm test             # Vitest unit tests
npm run test:e2e     # Playwright E2E tests
npm run type-check   # tsc --noEmit
```

## Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** + **Lucide React** + **Framer Motion**
- **Vitest** + **React Testing Library** for unit tests; **Playwright** for E2E
- **Vercel** deployment with `next/og` for dynamic OG images

## Architecture

### Data Flow

```
data/questions.json
  └─ lib/questions.ts (Zod validation, getQuestionsByTrack, shuffleQuestions)
       └─ hooks/useQuiz.ts (React Context + useReducer)
            └─ Quiz pages (consume hook)
```

State lives in React Context for the session duration — it is **not persisted** (quiz resets on reload). Only dark mode is stored in `localStorage`.

### Routes

| Route | Purpose |
|---|---|
| `/` | Track selection (Iniciante / Intermediário / Avançado) |
| `/quiz/[track]` | Quiz flow — one question at a time |
| `/resultado` | Results page — reads `?track=&score=&time=` query params |
| `/api/og` | Dynamic OG image endpoint for social cards |

### Quiz State Machine

`phase`: `idle` → `in-progress` → `finished`  
Actions: `START_QUIZ`, `ANSWER`, `NEXT_QUESTION`, `FINISH`, `RESET`

### Question Schema (`data/questions.json`)

```ts
{
  id: string            // "q-001"
  track: "iniciante" | "intermediario" | "avancado"
  category: string
  statement: string
  answer: boolean
  explanation: string
  reference_url: string
  difficulty_weight: 1 | 2
}
```

Questions are validated with Zod at build time in `lib/questions.ts`.

### Key Components

- `components/quiz/TrackCard` — track selection cards
- `components/quiz/QuestionCard` — question display
- `components/quiz/AnswerButtons` — Verdadeiro/Falso buttons (keyboard: V, F, Enter)
- `components/quiz/FeedbackPanel` — explanation shown after answering
- `components/quiz/ProgressBar` — X/10 progress
- `components/quiz/ResultScreen` — final score, category breakdown, share buttons
- `components/ThemeToggle` — dark mode switch (persists to `localStorage`)
- `components/ShareButtons` — LinkedIn, Twitter/X, WhatsApp sharing

### Scoring

Motivational messages by score range: 0–40, 41–70, 71–90, 91–100. Results are passed as query params to `/resultado` so they are shareable via URL.
