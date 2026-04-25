export type Track = "iniciante" | "intermediario" | "avancado";

export type Category =
  | "o-que-e"
  | "modelos"
  | "pricing"
  | "casos-de-uso"
  | "concorrentes"
  | "slash-commands"
  | "permissoes"
  | "config"
  | "ferramentas"
  | "ide"
  | "hooks"
  | "mcp"
  | "subagents"
  | "skills"
  | "sdk"
  | "plugins";

export interface Question {
  id: string;
  track: Track;
  category: Category;
  statement: string;
  answer: boolean;
  explanation: string;
  reference_url?: string;
  difficulty_weight: 1 | 2;
}

export interface Answer {
  questionId: string;
  selected: boolean;
  isCorrect: boolean;
}

export interface QuizSession {
  track: Track;
  questions: Question[];
  answers: Answer[];
  startedAt: number;
  finishedAt?: number;
}

export interface QuizResult {
  track: Track;
  score: number;
  totalTime: number;
  byCategory: Partial<Record<Category, { correct: number; total: number }>>;
}
