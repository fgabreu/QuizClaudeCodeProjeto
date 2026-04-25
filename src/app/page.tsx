import { ExternalLink } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TrackCard } from "@/components/quiz/TrackCard";
import { Logo } from "@/components/Logo";
import { TRACKS, TRACK_ORDER } from "@/lib/tracks";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-end px-6 py-4">
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="mb-10 flex flex-col items-center text-center">
            <Logo className="mb-5" />
            <h1 className="font-serif text-4xl font-bold text-[var(--fg)] md:text-5xl">
              Claude Code Quiz
            </h1>
            <p className="mt-3 text-base text-[var(--fg-muted)] md:text-lg">
              Teste seu conhecimento sobre Claude Code em três trilhas de dificuldade progressiva.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {TRACK_ORDER.map((trackId) => (
              <TrackCard key={trackId} track={TRACKS[trackId]} />
            ))}
          </div>
        </div>
      </main>

      <footer className="flex flex-col items-center gap-2 px-6 py-6 text-center text-xs text-[var(--fg-muted)]">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-[var(--color-primary)] hover:underline"
          >
            Documentação oficial
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
        <p>Conteúdo baseado na família Claude 4.x (Opus 4.7, Sonnet 4.6, Haiku 4.5)</p>
      </footer>
    </div>
  );
}
