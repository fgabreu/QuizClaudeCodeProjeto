"use client";

import { useState } from "react";
import { Share2, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Track } from "@/types/quiz";
import { TRACKS } from "@/lib/tracks";

interface ShareButtonsProps {
  track: Track;
  score: number;
  time: number;
}

export function ShareButtons({ track, score, time }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const trackMeta = TRACKS[track];

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${baseUrl}/resultado?track=${track}&score=${score}&time=${time}`;
  const shareText = `Fiz ${score}/100 na trilha ${trackMeta.name} do Claude Code Quiz! Você consegue mais? 🤖`;

  function copyLink() {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {});
  }

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;

  return (
    <div className="w-full">
      <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--fg)]">
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Compartilhar resultado
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          asChild
        >
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          asChild
        >
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          asChild
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={copyLink}
          className="gap-1.5"
          aria-label="Copiar link"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              Copiado!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copiar link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
