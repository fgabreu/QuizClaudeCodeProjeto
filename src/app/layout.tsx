import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Claude Code Quiz — Teste seu conhecimento",
    template: "%s | Claude Code Quiz",
  },
  description:
    "Quiz educacional sobre Claude Code: CLI, Agent SDK e ecossistema Anthropic. Teste seu conhecimento em trilhas de dificuldade progressiva.",
  openGraph: {
    title: "Claude Code Quiz",
    description: "Teste seu conhecimento sobre Claude Code em três trilhas: Iniciante, Intermediário e Avançado.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Code Quiz",
    description: "Teste seu conhecimento sobre Claude Code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${lora.variable} antialiased min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
