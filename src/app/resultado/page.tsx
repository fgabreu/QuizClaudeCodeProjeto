"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareButtons } from "@/components/ShareButtons";
import { Button } from "@/components/ui/button";
import { Trophy, Clock, Home, RotateCcw } from "lucide-react";
import { TRACKS, isValidTrack } from "@/lib/tracks";
import { getMotivationalMessage, formatTime, getScoreColorClass } from "@/lib/scoring";
import type { Track } from "@/types/quiz";

function ResultadoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const trackParam = searchParams.get("track") ?? "";
  const scoreParam = parseInt(searchParams.get("score") ?? "0", 10);
  const timeParam = parseInt(searchParams.get("time") ?? "0", 10);

  if (!isValidTrack(trackParam)) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-[var(--fg-muted)]">Link inválido.</p>
        <Button onClick={() => router.push("/")}>Ir para o início</Button>
      </div>
    );
  }

  const track = TRACKS[trackParam as Track];
  const score = Math.min(100, Math.max(0, scoreParam));
  const message = getMotivationalMessage(score);
  const nextTrack = track.next ? TRACKS[track.next] : null;

  const scoreColor = getScoreColorClass(score);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <Trophy className="h-10 w-10 text-[var(--color-primary)]" aria-hidden="true" />
        <p className="text-sm font-medium uppercase tracking-widest text-[var(--fg-muted)]">
          {track.emoji} Trilha {track.name}
        </p>
        <p className={`font-serif text-6xl font-bold tabular-nums ${scoreColor}`}>
          {score}
          <span className="text-3xl text-[var(--fg-muted)]">/100</span>
        </p>
        <p className="mt-1 text-base text-[var(--fg)]">{message}</p>
        {timeParam > 0 && (
          <p className="flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Tempo: {formatTime(timeParam)}
          </p>
        )}
      </div>

      <ShareButtons track={trackParam as Track} score={score} time={timeParam} />

      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Button
          variant="outline"
          className="flex-1 gap-2"
          onClick={() => router.push(`/quiz/${trackParam}`)}
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Refazer trilha
        </Button>
        {nextTrack ? (
          <Button
            className="flex-1 gap-2"
            onClick={() => router.push(`/quiz/${nextTrack.id}`)}
          >
            {nextTrack.emoji} Trilha {nextTrack.name}
          </Button>
        ) : (
          <Button className="flex-1 gap-2" onClick={() => router.push("/")}>
            <Home className="h-4 w-4" aria-hidden="true" />
            Início
          </Button>
        )}
      </div>
    </div>
  );
}

export default function ResultadoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-sm font-medium text-[var(--fg-muted)]">Claude Code Quiz</span>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-lg">
          <Suspense fallback={<p className="text-center text-[var(--fg-muted)]">Carregando...</p>}>
            <ResultadoContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
