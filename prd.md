# PRD — Claude Code Quiz

> **Status:** Draft v1 — defaults marcados como `[sugestão — confirmar]` precisam de validação do product owner antes do desenvolvimento.
> **Autor:** Felipe Abreu (eng.felipeabreu@gmail.com)
> **Data:** 2026-04-25
> **Consumidor deste documento:** Claude Code (irá implementar o projeto a partir deste PRD).

---

## 1. Visão Geral

### 1.1 O que é
Aplicação web de **quiz educacional sobre Claude Code** (CLI da Anthropic, Agent SDK e ecossistema relacionado), com perguntas em formato **Verdadeiro ou Falso** organizadas em três trilhas de dificuldade progressiva.

### 1.2 Problema que resolve
- Profissionais (devs, PMs, gestores) querem aprender/avaliar Claude Code de forma rápida e divertida.
- Conteúdo oficial é denso e fragmentado (docs + blog + changelogs).
- Falta uma forma lúdica e gamificada de testar conhecimento e descobrir lacunas.

### 1.3 Proposta de valor
- **Aprende-se testando**: feedback imediato com explicação após cada resposta.
- **Trilhas progressivas**: do conceito de negócio ao uso avançado (hooks, MCP, SDK).
- **Sem fricção**: sem login no MVP, joga e compartilha resultado em segundos.

---

## 2. Objetivos & Métricas de Sucesso

### 2.1 Objetivos de negócio
| # | Objetivo | Métrica | Meta (3 meses pós-lançamento) |
|---|---|---|---|
| O1 | Criar ferramenta educacional de referência sobre Claude Code | Sessões únicas/mês | 1.000+ |
| O2 | Engajar comunidade dev brasileira em torno de Claude Code | Compartilhamentos sociais | 100+ |
| O3 | Validar interesse para futuras evoluções (cursos, conteúdos pagos) | Taxa de conclusão do quiz | ≥ 60% |
| O4 | Construir base para captura de leads em V2 | Visitas de retorno | ≥ 25% |

### 2.2 Métricas técnicas
- **Lighthouse Performance**: ≥ 90 (mobile e desktop)
- **Time to Interactive**: < 2s em conexão 4G
- **Acessibilidade**: WCAG 2.1 AA
- **Erros JS em produção**: 0 críticos

---

## 3. Público-Alvo

### 3.1 Personas `[sugestão — confirmar]`

**P1 — Dev Curioso (primário)**
- Desenvolvedor pleno/sênior, 28-40 anos, já usa GitHub Copilot ou Cursor.
- Ouviu falar de Claude Code, quer entender o que é antes de testar.
- Joga as 3 trilhas em sequência.

**P2 — PM/Gestor de Tecnologia (secundário)**
- Precisa avaliar se faz sentido adotar Claude Code no time.
- Foca na trilha **Iniciante (Negócio)** para entender conceitos, pricing, casos de uso.

**P3 — Power User Claude Code (engajamento)**
- Já usa Claude Code diariamente, quer testar conhecimento avançado.
- Vai direto para trilha **Avançado** (hooks, MCP, SDK, subagents).
- Compartilha resultado nas redes ("acertei 10/10 no quiz avançado de Claude Code").

### 3.2 Idioma
**MVP: Português (PT-BR)** `[sugestão — confirmar]`
- V2: adicionar inglês (EN-US) com toggle.

---

## 4. Escopo

### 4.1 MVP (V1) — Em escopo
- ✅ 3 trilhas de dificuldade: **Iniciante**, **Intermediário**, **Avançado**.
- ✅ **30 perguntas** no total no banco inicial (10 por trilha) — banco extensível via JSON.
- ✅ Formato **Verdadeiro/Falso** apenas.
- ✅ Tela inicial com seleção de trilha + breve descrição.
- ✅ Tela de quiz com pergunta, dois botões (V/F), barra de progresso, contador de pergunta atual.
- ✅ Feedback **imediato** após cada resposta: certo/errado + explicação curta + (opcional) link para doc oficial.
- ✅ Tela de resultado: pontuação final, tempo total, distribuição de acertos por categoria, mensagem motivacional, botão para refazer/ir para outra trilha.
- ✅ **Compartilhamento social**: gerar imagem (Open Graph dinâmica) com resultado para LinkedIn/Twitter/X.
- ✅ Responsivo mobile-first.
- ✅ Dark mode com toggle (persistido em localStorage).
- ✅ Acessibilidade WCAG AA (navegação por teclado, contraste, ARIA labels).
- ✅ Sem login, sem backend de persistência (estado só no client).

### 4.2 Fora do escopo (V2+)
- ❌ Login / contas de usuário.
- ❌ Leaderboard global.
- ❌ Histórico de tentativas persistido entre sessões.
- ❌ Múltipla escolha / perguntas dissertativas.
- ❌ Inglês.
- ❌ Modo "Desafio Diário".
- ❌ Certificado/badge emitido.
- ❌ Captura de e-mail / lead magnet.
- ❌ Painel admin para criar perguntas via UI (no MVP, perguntas são editadas direto no JSON via PR).

---

## 5. Conteúdo do Quiz

### 5.1 Trilhas e categorias

#### 🟢 Trilha 1 — Iniciante (Negócio & Conceitos)
**Objetivo:** público não-técnico ou dev nunca exposto a Claude Code entende o que é, para que serve, como se posiciona.

Categorias:
- **O que é Claude Code** (CLI, IDE extensions, web app).
- **Modelos disponíveis** (Opus, Sonnet, Haiku — diferenças de uso).
- **Pricing & planos** (Pro, Max, API).
- **Casos de uso** (refatoração, geração de testes, code review, automação).
- **Diferença vs. concorrentes** (Copilot, Cursor) — em nível conceitual.

#### 🟡 Trilha 2 — Intermediário (Uso Prático)
**Objetivo:** dev que já instalou Claude Code valida domínio operacional.

Categorias:
- **Slash commands** built-in (/help, /clear, /config, /init, /review).
- **Permissões e modos** (plan mode, accept-edits, bypass-permissions).
- **Configuração** (settings.json, CLAUDE.md, allowlists).
- **Ferramentas built-in** (Read, Edit, Write, Bash, Grep).
- **Integrações IDE** (VS Code, JetBrains).

#### 🔴 Trilha 3 — Avançado (Extensibilidade & SDK)
**Objetivo:** power user e plataforma valida conhecimento profundo.

Categorias:
- **Hooks** (PreToolUse, PostToolUse, Stop, UserPromptSubmit).
- **MCP (Model Context Protocol)** servers e integrações.
- **Subagents** customizados (frontmatter, escopo de tools).
- **Skills** (skill definitions, triggers, plugins).
- **Claude Agent SDK** (build de agentes, prompt caching, tool use).
- **Plugins e marketplace**.

### 5.2 Estrutura de cada pergunta
Cada pergunta no banco JSON segue este schema:

```json
{
  "id": "q-001",
  "track": "iniciante",
  "category": "modelos",
  "statement": "Claude Opus 4.7 é o modelo mais capaz da família Claude 4.x.",
  "answer": true,
  "explanation": "Opus é o modelo mais capaz da família. Sonnet é equilíbrio capacidade/custo, Haiku é o mais rápido e econômico.",
  "reference_url": "https://docs.claude.com/en/docs/about-claude/models",
  "difficulty_weight": 1
}
```

### 5.3 Banco de perguntas inicial (exemplos seed)

> Ver Anexo A no final do documento. Claude Code deve gerar **30 perguntas iniciais** (10 por trilha) baseadas em conhecimento atualizado do produto, com explicações curtas e links para docs oficiais quando aplicável.

### 5.4 Regras de exibição
- Perguntas de uma trilha são embaralhadas a cada sessão.
- Não há repetição dentro da mesma sessão.
- Ordem das categorias dentro da trilha é aleatória, mas garante variedade (não 3 perguntas seguidas da mesma categoria).

---

## 6. Mecânica & Gamificação

### 6.1 Pontuação
- **+10 pontos** por acerto.
- **0 pontos** por erro (sem penalidade).
- Pontuação máxima por trilha: **100 pontos**.

### 6.2 Tempo
- **Sem cronômetro por pergunta** no MVP `[sugestão — confirmar]` (reduz ansiedade, foco em aprendizado).
- **Tempo total de sessão é medido** e exibido no resultado (curiosidade/competição leve).

### 6.3 Feedback imediato
Após clicar V ou F:
1. Botão escolhido fica destacado (verde se correto, vermelho se errado).
2. Botão correto fica verde (caso o usuário tenha errado).
3. Card de explicação aparece com: ícone (✓/✗), texto da explicação, link "Saiba mais" (se houver `reference_url`).
4. Botão **"Próxima"** habilita a navegação. ⏎ (Enter) avança via teclado.

### 6.4 Tela de resultado
- Pontuação grande no topo (ex: **80/100**).
- Mensagem motivacional baseada em faixa:
  - 0-40: "Bom começo! Vale revisar a documentação oficial."
  - 41-70: "Você tem boa base. Que tal a trilha avançada?"
  - 71-90: "Excelente domínio!"
  - 91-100: "Você é um especialista em Claude Code! 🎉"
- Tempo total decorrido.
- **Acertos por categoria** (barra horizontal mostrando 3/5 em "Hooks", 2/2 em "MCP", etc.) — ajuda a identificar lacunas.
- Botões: **Refazer trilha**, **Tentar próxima trilha**, **Compartilhar resultado**.

### 6.5 Compartilhamento
- Botão "Compartilhar" gera URL com query params: `/resultado?track=avancado&score=80&time=240`.
- Página de resultado tem **OG Image dinâmica** (gerada via `next/og` ou similar) com card visual: nome do quiz + trilha + pontuação + emoji.
- Botões diretos para LinkedIn, X/Twitter, WhatsApp, copiar link.

---

## 7. UX / UI

### 7.1 Telas (fluxo MVP)

```
[Home/Splash]
   │
   ├── Hero: "Claude Code Quiz — Teste seu conhecimento"
   ├── 3 cards: Iniciante 🟢 | Intermediário 🟡 | Avançado 🔴
   │   (cada card: nome, descrição curta, nº de perguntas, ícone)
   ├── Footer: links docs Anthropic, GitHub do projeto, autor.
   │
   ▼ [clica em uma trilha]
[Quiz]
   ├── Header: nome da trilha + barra de progresso (3/10) + botão "Sair".
   ├── Pergunta (texto grande, centralizado).
   ├── Dois botões: ✓ Verdadeiro | ✗ Falso (atalhos: V e F, ou ← e →).
   │
   ▼ [clica em V/F]
[Feedback inline]
   ├── Botão escolhido colorido + correto colorido.
   ├── Card de explicação.
   ├── Botão "Próxima" (ou Enter).
   │
   ▼ [após 10ª pergunta]
[Resultado]
   ├── Pontuação grande.
   ├── Mensagem motivacional + tempo total.
   ├── Acertos por categoria.
   ├── Botões: Refazer | Próxima trilha | Compartilhar.
```

### 7.2 Identidade visual `[sugestão — confirmar]`
- **Inspirada na identidade Anthropic/Claude**: paleta cream/bege (`#F5F4ED`) + laranja (`#CC785C`) + preto (`#191919`).
- **Tipografia**: Inter (sans, body) + uma serifada para títulos (ex: Lora ou Source Serif).
- **Tom**: minimalista, generoso em whitespace, ar de produto premium.
- **Ícones**: Lucide React (já casa com shadcn/ui).
- **Animações**: sutis (Framer Motion para transições entre perguntas, fade-in da explicação).

### 7.3 Dark mode
- Toggle no header (sol/lua).
- Default: respeita `prefers-color-scheme` do sistema.
- Escolha persistida em `localStorage`.

### 7.4 Responsividade
- **Mobile-first**. Breakpoints: 640px, 768px, 1024px.
- Em mobile, botões V/F ocupam largura total, empilhados.
- Em desktop, lado a lado.

### 7.5 Acessibilidade
- Navegação 100% por teclado (Tab, Enter, V/F como atalhos).
- ARIA labels em todos os botões interativos.
- Contraste mínimo 4.5:1.
- Foco visível.
- `aria-live` para anúncios de feedback (correto/errado) a leitores de tela.

---

## 8. Arquitetura Técnica

### 8.1 Stack `[sugestão — confirmar]`

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | **Next.js 15** (App Router) | SSR/SSG, OG Image dinâmica, deploy fácil |
| Linguagem | **TypeScript** (strict) | Type safety, melhor DX com Claude Code |
| UI | **React 19** | Padrão Next.js |
| Styling | **Tailwind CSS v4** | Produtividade, casa com shadcn/ui |
| Componentes | **shadcn/ui** | Componentes acessíveis copiáveis |
| Ícones | **Lucide React** | Padrão shadcn |
| Animações | **Framer Motion** | Transições suaves |
| Estado | **React Context + useReducer** | Suficiente para estado do quiz; sem precisar Zustand/Redux |
| Persistência | **localStorage** (apenas dark mode) | Sem backend no MVP |
| Banco de perguntas | **JSON estático** em `data/questions.json` | Versionável via Git, fácil de revisar |
| OG Image | **`next/og`** (Vercel) | Geração de imagem dinâmica para compartilhamento |
| Testes | **Vitest** + **React Testing Library** | Rápido, padrão moderno |
| E2E | **Playwright** | (opcional para MVP, recomendado) |
| Lint/Format | **ESLint** + **Prettier** | Padrão |
| Deploy | **Vercel** | Zero-config para Next.js |
| Analytics | **Vercel Analytics** ou **Plausible** | Privacy-friendly |

### 8.2 Estrutura de diretórios proposta

```
QuizClaudeCodeProjeto/
├── prd.md
├── README.md
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
├── .env.example
├── public/
│   └── favicon.svg
├── data/
│   └── questions.json          # banco de perguntas
├── src/
│   ├── app/
│   │   ├── layout.tsx          # layout raiz, providers, fonts
│   │   ├── page.tsx            # home (seleção de trilha)
│   │   ├── quiz/[track]/
│   │   │   └── page.tsx        # tela do quiz
│   │   ├── resultado/
│   │   │   └── page.tsx        # tela de resultado
│   │   ├── api/
│   │   │   └── og/route.tsx    # OG image dinâmica
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                 # shadcn primitives
│   │   ├── quiz/
│   │   │   ├── TrackCard.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AnswerButtons.tsx
│   │   │   ├── FeedbackPanel.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── ResultScreen.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ShareButtons.tsx
│   ├── lib/
│   │   ├── questions.ts        # carrega + embaralha perguntas
│   │   ├── scoring.ts          # cálculo de pontuação
│   │   ├── tracks.ts           # metadados das trilhas
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useQuiz.ts          # hook principal de estado do quiz
│   │   └── useTimer.ts
│   ├── types/
│   │   └── quiz.ts             # tipos TS (Question, Track, Result)
│   └── styles/
└── tests/
    ├── unit/
    │   ├── scoring.test.ts
    │   └── questions.test.ts
    └── e2e/
        └── quiz-flow.spec.ts
```

### 8.3 Tipos TypeScript principais

```typescript
// src/types/quiz.ts
export type Track = 'iniciante' | 'intermediario' | 'avancado';

export type Category =
  // Iniciante
  | 'o-que-e' | 'modelos' | 'pricing' | 'casos-de-uso' | 'concorrentes'
  // Intermediário
  | 'slash-commands' | 'permissoes' | 'config' | 'ferramentas' | 'ide'
  // Avançado
  | 'hooks' | 'mcp' | 'subagents' | 'skills' | 'sdk' | 'plugins';

export interface Question {
  id: string;
  track: Track;
  category: Category;
  statement: string;
  answer: boolean;
  explanation: string;
  reference_url?: string;
  difficulty_weight: number;
}

export interface Answer {
  questionId: string;
  selected: boolean;
  isCorrect: boolean;
  timeSpent: number; // ms
}

export interface QuizSession {
  track: Track;
  questions: Question[];
  answers: Answer[];
  startedAt: number;
  finishedAt?: number;
}

export interface QuizResult {
  track: Track;
  score: number;        // 0-100
  totalTime: number;    // ms
  byCategory: Record<Category, { correct: number; total: number }>;
}
```

### 8.4 Estado do quiz (useQuiz hook)

```typescript
type QuizState =
  | { phase: 'idle' }
  | { phase: 'loading' }
  | { phase: 'in-progress'; session: QuizSession; currentIndex: number; showFeedback: boolean }
  | { phase: 'finished'; result: QuizResult };

// Ações: START_QUIZ, ANSWER, NEXT_QUESTION, FINISH, RESET
```

### 8.5 Fluxo de dados
1. **Build time**: `data/questions.json` é importado e validado (zod schema) em `lib/questions.ts`.
2. **Runtime client**: ao escolher trilha, hook `useQuiz` filtra + embaralha 10 perguntas.
3. Estado vive em React Context durante a sessão. **Não é persistido** entre reloads (sair = perder progresso, com `confirm()` ao tentar fechar/voltar).
4. Ao finalizar, navega para `/resultado?track=X&score=Y&time=Z` (query params permitem compartilhamento).
5. `/resultado` renderiza com base nos query params + OG Image dinâmica via `/api/og?track=X&score=Y`.

### 8.6 OG Image dinâmica
- Endpoint `/api/og` recebe `track` e `score` via query.
- Usa `next/og` (`ImageResponse`) para gerar PNG 1200x630.
- Layout: fundo bege, "Claude Code Quiz", trilha, score grande, emoji baseado na faixa.
- Cache: `s-maxage=3600`.

### 8.7 Performance
- Static export onde possível (home, OG metadata).
- Imagens: SVG inline para ícones, `next/image` para qualquer raster.
- Bundle: tree-shaking, sem libs pesadas (sem Lodash, sem Moment).
- Fonts: `next/font` com display swap.

### 8.8 SEO
- Meta tags em cada rota (`title`, `description`).
- OG tags + Twitter Card.
- `sitemap.xml` automático (Next.js).
- `robots.txt` permitindo indexação.
- Schema.org `Quiz` se possível.

---

## 9. Validação & Qualidade

### 9.1 Validação do banco de perguntas
- Schema Zod valida `questions.json` em build time. Build falha se inválido.
- Lint customizado: garante que cada `track` tem ≥ 10 perguntas, IDs únicos, `reference_url` é URL válida quando presente.

### 9.2 Testes
- **Unit**: lógica de embaralhamento, cálculo de score, formatação de tempo.
- **Component**: `QuestionCard` renderiza corretamente os dois estados (antes/depois de responder).
- **E2E (Playwright)**: fluxo completo home → trilha → 10 perguntas → resultado.
- **Acessibilidade**: `axe-core` rodando nos testes E2E.

### 9.3 Critérios de aceite do MVP
- [ ] Usuário consegue jogar uma trilha completa do início ao fim sem bugs.
- [ ] Pontuação calculada corretamente (validar com 10 testes manuais).
- [ ] Feedback imediato funcional com explicação visível.
- [ ] Compartilhamento gera link válido + OG Image renderiza corretamente.
- [ ] Lighthouse Performance ≥ 90 em mobile.
- [ ] Lighthouse Accessibility ≥ 95.
- [ ] Funciona em Safari iOS, Chrome Android, Chrome desktop, Firefox desktop, Safari macOS.
- [ ] Dark mode toggle funcional e persistido.
- [ ] Sem erros no console em produção.

---

## 10. Roadmap

### V1 — MVP (4-6 dias de dev `[estimativa]`)
- Setup do projeto (Next.js + Tailwind + shadcn).
- Banco inicial de 30 perguntas validado.
- 3 telas: home, quiz, resultado.
- Compartilhamento + OG image.
- Testes unitários + E2E básico.
- Deploy Vercel.

### V2 — Engajamento (após validação MVP)
- Adicionar inglês (i18n com `next-intl`).
- Modo "Desafio Diário" (1 pergunta por dia, retorna no dia seguinte).
- Histórico local em localStorage (últimas 5 tentativas).
- Mais 60 perguntas (90 total).
- Multiple choice como segundo formato.

### V3 — Plataforma (se houver tração)
- Login (Auth.js + magic link).
- Leaderboard global e por trilha.
- Painel admin para criar perguntas via UI.
- Captura de e-mail para newsletter.
- Certificado/badge digital ao completar todas as trilhas.

---

## 11. Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Conteúdo desatualizar (Claude Code muda rápido) | Alta | Médio | Banco em JSON versionado; PRs trimestrais para revisão; campo `last_reviewed` por pergunta em V2 |
| Perguntas com ambiguidade ou erro factual | Média | Alto | Revisão por 2 pessoas antes do merge; canal para reportar erros (botão "reportar pergunta" em V2) |
| Baixo engajamento sem leaderboard | Média | Médio | Compartilhamento social robusto no MVP; OG image bem desenhada |
| Custo de hosting | Baixa | Baixo | Vercel free tier comporta bem; alertar se > 10k sessões/mês |
| Plágio do nome/visual | Baixa | Baixo | Não usar marca "Claude" no nome do produto comercialmente sem autorização da Anthropic |

---

## 12. Decisões em aberto (precisam de input antes do dev começar)

> Itens marcados com `[sugestão — confirmar]` ao longo do doc. Resumo:

1. **Idioma do MVP**: PT-BR apenas? (sugestão atual: sim)
2. **Cronômetro**: sem cronômetro por pergunta? (sugestão atual: sim, sem)
3. **Identidade visual**: paleta inspirada em Anthropic ou criar identidade própria?
4. **Nome do produto**: "Claude Code Quiz"? Outro? Validar quanto a uso da marca "Claude".
5. **Domínio**: comprar domínio próprio (`claudecodequiz.com.br`?) ou rodar em subdomínio Vercel?
6. **Analytics**: Vercel Analytics ou Plausible?
7. **Quem revisa o banco de perguntas** antes do go-live?

---

## Anexo A — Banco de perguntas inicial (a ser gerado por Claude Code)

> **Instrução para Claude Code**: gerar `data/questions.json` com **30 perguntas Verdadeiro/Falso** seguindo o schema da seção 5.2:
>
> - **10 perguntas Iniciante** distribuídas entre as 5 categorias da trilha (2 por categoria).
> - **10 perguntas Intermediário** distribuídas entre as 5 categorias da trilha (2 por categoria).
> - **10 perguntas Avançado** distribuídas entre as 6 categorias da trilha (no mínimo 1 por categoria).
>
> **Critérios para cada pergunta**:
> - Statement claro, sem ambiguidade, sem pegadinha gratuita.
> - Mistura saudável de respostas verdadeiras e falsas (~50/50 por trilha).
> - Explicação curta (1-2 frases) que ensina, mesmo se o usuário acertar.
> - `reference_url` apontando para `docs.claude.com` ou `docs.anthropic.com` quando aplicável.
> - Conhecimento atualizado para abril/2026 (família Claude 4.x: Opus 4.7, Sonnet 4.6, Haiku 4.5).
> - Evitar perguntas sobre features muito recentes que possam mudar; preferir conceitos estáveis.

### Exemplos seed (3 perguntas, uma por trilha) para guiar o estilo:

```json
[
  {
    "id": "q-ini-001",
    "track": "iniciante",
    "category": "modelos",
    "statement": "Na família Claude 4.x, o modelo Haiku é mais rápido e econômico que Opus, mas menos capaz em tarefas complexas.",
    "answer": true,
    "explanation": "Correto. Haiku é otimizado para velocidade e custo, Sonnet equilibra capacidade e custo, Opus é o mais capaz para tarefas complexas.",
    "reference_url": "https://docs.claude.com/en/docs/about-claude/models",
    "difficulty_weight": 1
  },
  {
    "id": "q-int-001",
    "track": "intermediario",
    "category": "slash-commands",
    "statement": "O comando /clear apaga permanentemente o histórico de conversas anteriores do disco.",
    "answer": false,
    "explanation": "Falso. /clear apenas reseta o contexto da conversa atual; ele não remove histórico persistido em disco.",
    "reference_url": "https://docs.claude.com/en/docs/claude-code/slash-commands",
    "difficulty_weight": 1
  },
  {
    "id": "q-adv-001",
    "track": "avancado",
    "category": "hooks",
    "statement": "Um hook PreToolUse pode bloquear a execução de uma ferramenta retornando um exit code diferente de zero.",
    "answer": true,
    "explanation": "Correto. Hooks PreToolUse podem inspecionar a chamada e bloquear a execução retornando exit code não-zero, com mensagem ao Claude.",
    "reference_url": "https://docs.claude.com/en/docs/claude-code/hooks",
    "difficulty_weight": 2
  }
]
```

---

## Anexo B — Comando inicial para Claude Code

Após aprovação deste PRD, o desenvolvimento pode ser iniciado com:

```
Leia prd.md e implemente o MVP descrito (V1).
Comece criando o setup do projeto Next.js 15 + TypeScript + Tailwind + shadcn/ui,
em seguida o banco de 30 perguntas (data/questions.json) seguindo as instruções do Anexo A,
depois as telas (home, quiz, resultado), OG image dinâmica, e por fim os testes.
Confirme cada decisão marcada como [sugestão — confirmar] antes de implementar.
```

---

**Fim do PRD v1.**
