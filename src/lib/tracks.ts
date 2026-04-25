import type { Track } from "@/types/quiz";

export interface TrackMeta {
  id: Track;
  name: string;
  description: string;
  emoji: string;
  color: string;
  questionCount: number;
  next?: Track;
}

export const TRACKS: Record<Track, TrackMeta> = {
  iniciante: {
    id: "iniciante",
    name: "Iniciante",
    description: "O que é Claude Code, modelos, pricing e casos de uso.",
    emoji: "🟢",
    color: "emerald",
    questionCount: 10,
    next: "intermediario",
  },
  intermediario: {
    id: "intermediario",
    name: "Intermediário",
    description: "Slash commands, permissões, configuração e ferramentas.",
    emoji: "🟡",
    color: "amber",
    questionCount: 10,
    next: "avancado",
  },
  avancado: {
    id: "avancado",
    name: "Avançado",
    description: "Hooks, MCP, subagents, skills e Agent SDK.",
    emoji: "🔴",
    color: "red",
    questionCount: 10,
  },
};

export const TRACK_ORDER: Track[] = ["iniciante", "intermediario", "avancado"];

export function isValidTrack(value: string): value is Track {
  return TRACK_ORDER.includes(value as Track);
}
