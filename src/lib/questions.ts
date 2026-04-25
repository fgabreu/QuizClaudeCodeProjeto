import { z } from "zod";
import type { Track, Question } from "@/types/quiz";
import rawQuestions from "../../data/questions.json";

const QuestionSchema = z.object({
  id: z.string(),
  track: z.enum(["iniciante", "intermediario", "avancado"]),
  category: z.enum([
    "o-que-e",
    "modelos",
    "pricing",
    "casos-de-uso",
    "concorrentes",
    "slash-commands",
    "permissoes",
    "config",
    "ferramentas",
    "ide",
    "hooks",
    "mcp",
    "subagents",
    "skills",
    "sdk",
    "plugins",
  ]),
  statement: z.string().min(10),
  answer: z.boolean(),
  explanation: z.string().min(10),
  reference_url: z.string().url().optional(),
  difficulty_weight: z.union([z.literal(1), z.literal(2)]),
});

const QuestionsArraySchema = z.array(QuestionSchema).min(30);

const parsed = QuestionsArraySchema.parse(rawQuestions);

const allQuestions: Question[] = parsed;

export function getQuestionsByTrack(track: Track): Question[] {
  return allQuestions.filter((q) => q.track === track);
}

export function shuffleQuestions(questions: Question[]): Question[] {
  const shuffled = [...questions];

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Avoid 3+ consecutive questions from same category
  return spreadCategories(shuffled);
}

function spreadCategories(questions: Question[]): Question[] {
  const result: Question[] = [];
  const remaining = [...questions];

  while (remaining.length > 0) {
    const lastTwo = result.slice(-2);
    const lastTwoSameCategory =
      lastTwo.length === 2 && lastTwo[0].category === lastTwo[1].category;

    if (!lastTwoSameCategory) {
      result.push(remaining.shift()!);
    } else {
      const blockedCategory = lastTwo[0].category;
      const idx = remaining.findIndex((q) => q.category !== blockedCategory);
      if (idx === -1) {
        result.push(...remaining.splice(0));
      } else {
        result.push(remaining.splice(idx, 1)[0]);
      }
    }
  }

  return result;
}
