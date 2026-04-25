import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TrackMeta } from "@/lib/tracks";
import { cn } from "@/lib/utils";

interface TrackCardProps {
  track: TrackMeta;
}

const colorMap: Record<string, string> = {
  emerald:
    "hover:border-emerald-400 hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20",
  amber: "hover:border-amber-400 hover:shadow-amber-100 dark:hover:shadow-amber-900/20",
  red: "hover:border-red-400 hover:shadow-red-100 dark:hover:shadow-red-900/20",
};

export function TrackCard({ track }: TrackCardProps) {
  return (
    <Link
      href={`/quiz/${track.id}`}
      className={cn(
        "group relative block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 text-left transition-all duration-200",
        "hover:shadow-md hover:-translate-y-0.5",
        colorMap[track.color]
      )}
      aria-label={`Jogar trilha ${track.name}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-3xl" role="img" aria-label={track.name}>
          {track.emoji}
        </span>
        <ArrowRight
          className="h-5 w-5 text-[var(--fg-muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--color-primary)]"
          aria-hidden="true"
        />
      </div>
      <h2 className="mt-3 font-serif text-xl font-semibold text-[var(--fg)]">{track.name}</h2>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{track.description}</p>
      <p className="mt-3 text-xs font-medium text-[var(--color-primary)]">
        {track.questionCount} perguntas
      </p>
    </Link>
  );
}
