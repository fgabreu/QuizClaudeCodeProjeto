"use client";

import { useRouter } from "next/navigation";
import { Trophy, RotateCcw, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/ShareButtons";
import type { QuizResult } from "@/types/quiz";
import { TRACKS } from "@/lib/tracks";
import { getMotivationalMessage, formatTime, getScoreColorClass } from "@/lib/scoring";

interface ResultScreenProps {
  result: QuizResult;
  onRetry: () => void;
}

export function ResultScreen({ result, onRetry }: ResultScreenProps) {
  const router = useRouter();
  const track = TRACKS[result.track];
  const message = getMotivationalMessage(result.score);
  const nextTrack = track.next ? TRACKS[track.next] : null;

  const scoreColor = getScoreColorClass(result.score);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Trophy className="h-10 w-10 text-[var(--color-primary)]" aria-hidden="true" />
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--fg-muted)]">
          {track.emoji} Trilha {track.name}
        </p>
        <p className={`font-serif text-6xl font-bold tabular-nums ${scoreColor}`}>
          {result.score}
          <span className="text-3xl text-[var(--fg-muted)]">/100</span>
        </p>
        <p className="mt-1 text-base text-[var(--fg)]">{message}</p>
        <p className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
          <Clock className="h-4 w-4" aria-hidden="true" />
          Tempo: {formatTime(result.totalTime)}
        </p>
      </div>

      {Object.keys(result.byCategory).length > 0 && (
        <div className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h3 className="mb-3 text-sm font-semibold text-[var(--fg)]">Acertos por categoria</h3>
          <ul className="space-y-2">
            {Object.entries(result.byCategory).map(([cat, stats]) => {
              if (!stats) return null;
              const pct = Math.round((stats.correct / stats.total) * 100);
              return (
                <li key={cat} className="flex items-center gap-3">
                  <span className="w-32 truncate text-xs text-[var(--fg-muted)] capitalize">
                    {cat.replace(/-/g, " ")}
                  </span>
                  <div className="flex-1 overflow-hidden rounded-full bg-[var(--border)] h-2">
                    <div
                      className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                      style={{ width: `${pct}%` }}
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <span className="w-10 text-right text-xs tabular-nums text-[var(--fg-muted)]">
                    {stats.correct}/{stats.total}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <ShareButtons track={result.track} score={result.score} time={result.totalTime} />

      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Button variant="outline" className="flex-1 gap-2" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Refazer trilha
        </Button>
        {nextTrack && (
          <Button
            className="flex-1 gap-2"
            onClick={() => router.push(`/quiz/${nextTrack.id}`)}
          >
            {nextTrack.emoji} Trilha {nextTrack.name}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
        {!nextTrack && (
          <Button className="flex-1 gap-2" onClick={() => router.push("/")}>
            Início
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
