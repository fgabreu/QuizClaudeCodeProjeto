import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { TRACKS, isValidTrack } from "@/lib/tracks";
import { getMotivationalMessage, getScoreColorHex } from "@/lib/scoring";
import type { Track } from "@/types/quiz";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const trackParam = searchParams.get("track") ?? "iniciante";
  const scoreParam = parseInt(searchParams.get("score") ?? "0", 10);
  const score = Math.min(100, Math.max(0, scoreParam));
  const track = isValidTrack(trackParam) ? TRACKS[trackParam as Track] : TRACKS.iniciante;
  const message = getMotivationalMessage(score);

  const scoreColor = getScoreColorHex(score);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f5f4ed",
          padding: "60px",
          fontFamily: "Georgia, serif",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <span style={{ fontSize: 18, color: "#cc785c", fontFamily: "Arial, sans-serif", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Claude Code Quiz
          </span>
          <span style={{ fontSize: 28, color: "#191919", fontWeight: 700 }}>
            {track.emoji} Trilha {track.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span style={{ fontSize: 100, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
            {score}
            <span style={{ fontSize: 48, color: "#4a4a4a" }}>/100</span>
          </span>
          <span style={{ fontSize: 24, color: "#4a4a4a", fontFamily: "Arial, sans-serif" }}>
            {message}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: 14, color: "#4a4a4a", fontFamily: "Arial, sans-serif" }}>
            quiz-claude-code.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
