import type { MetadataRoute } from "next";
import { TRACK_ORDER } from "@/lib/tracks";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://quiz-claude-code.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...TRACK_ORDER.map((track) => ({
      url: `${BASE_URL}/quiz/${track}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
