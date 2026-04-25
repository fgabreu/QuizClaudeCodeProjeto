# Claude Code Quiz

> Quiz educacional Verdadeiro/Falso sobre **Claude Code** — CLI, Agent SDK e ecossistema Anthropic.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

---

## Sobre o projeto

O **Claude Code Quiz** é uma aplicação web educacional que testa o conhecimento dos usuários sobre o Claude Code (CLI da Anthropic), seu ecossistema e Agent SDK. O quiz é dividido em três trilhas de dificuldade progressiva, com 10 perguntas embaralhadas por sessão, feedback imediato e compartilhamento de resultados nas redes sociais.

### Funcionalidades

- **3 trilhas de dificuldade:** Iniciante, Intermediário e Avançado
- **30 perguntas** no banco inicial (10 por trilha), validadas com Zod em build time
- **Feedback imediato** após cada resposta: acerto/erro + explicação + link para a documentação oficial
- **Embaralhamento inteligente** com algoritmo Fisher-Yates + distribuição de categorias
- **Cronômetro** de sessão exibido no resultado final
- **Compartilhamento social** via LinkedIn, X/Twitter e WhatsApp com OG image dinâmica
- **Dark mode** com persistência em `localStorage`
- **Acessibilidade** com navegação por teclado (`V` / `F` / `Enter`), `aria-live` e `role` semântico
- **Analytics** via Vercel Analytics

---

## Tech Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS v4 + shadcn/ui + Framer Motion |
| Linguagem | TypeScript 5 (strict) |
| Validação | Zod |
| Ícones | Lucide React |
| Testes unitários | Vitest + React Testing Library |
| Testes E2E | Playwright |
| Deploy | Vercel |
| Backend | Supabase (fase 2) |

---

## Arquitetura

```
data/questions.json
  └─ lib/questions.ts       ← validação Zod + shuffle Fisher-Yates
       └─ hooks/useQuiz.ts  ← estado via useReducer (máquina de estados)
            └─ quiz/[track]/page.tsx  ← consume o hook diretamente
```

### Máquina de estados do quiz

```
idle → in-progress → finished
         ↑               |
         └── RESET ───────┘
```

### Rotas

| Rota | Descrição |
|---|---|
| `/` | Seleção de trilha |
| `/quiz/[track]` | Fluxo do quiz (uma pergunta por vez) |
| `/resultado` | Tela de resultado (lê `?track=&score=&time=` da URL) |
| `/api/og` | OG image dinâmica para compartilhamento social |

---

## Começando

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/felipeabreu/quiz-claude-code.git
cd quiz-claude-code

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:3000**.

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | URL base do site (ex: `https://quiz-claude-code.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave de service role do Supabase (server-side only) |

---

## Comandos

```bash
npm run dev          # Servidor de desenvolvimento (http://localhost:3000)
npm run build        # Build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Lint com ESLint
npm run format       # Formatação com Prettier
npm test             # Testes unitários com Vitest
npm run test:e2e     # Testes E2E com Playwright
npm run type-check   # Verificação de tipos TypeScript
```

---

## Estrutura do projeto

```
├── data/
│   └── questions.json        # Banco de perguntas (fonte da verdade)
├── src/
│   ├── app/
│   │   ├── page.tsx          # Home — seleção de trilha
│   │   ├── quiz/[track]/     # Página do quiz
│   │   ├── resultado/        # Tela de resultado
│   │   └── api/og/           # OG image dinâmica
│   ├── components/
│   │   ├── quiz/             # QuestionCard, AnswerButtons, FeedbackPanel, etc.
│   │   ├── Logo.tsx
│   │   ├── ShareButtons.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   └── useQuiz.ts        # Lógica do quiz com useReducer
│   ├── lib/
│   │   ├── questions.ts      # Validação Zod + shuffle
│   │   ├── scoring.ts        # Cálculo de pontuação e mensagens
│   │   ├── tracks.ts         # Metadados das trilhas
│   │   └── supabase.ts       # Cliente Supabase
│   └── types/
│       └── quiz.ts           # Tipos TypeScript
└── tests/
    ├── unit/                 # Testes Vitest
    └── e2e/                  # Testes Playwright
```

---

## Adicionando perguntas

Edite `data/questions.json` seguindo o schema abaixo. O build falha automaticamente se os dados forem inválidos (validação Zod).

```json
{
  "id": "q-031",
  "track": "iniciante",
  "category": "modelos",
  "statement": "O Claude Sonnet 4.6 é o modelo padrão do Claude Code.",
  "answer": true,
  "explanation": "Sim, o Sonnet 4.6 é o modelo padrão utilizado pelo Claude Code.",
  "reference_url": "https://docs.anthropic.com/en/docs/claude-code/overview",
  "difficulty_weight": 1
}
```

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string` | Identificador único (`q-001`, `q-002`, …) |
| `track` | `"iniciante" \| "intermediario" \| "avancado"` | Trilha da pergunta |
| `category` | `string` | Categoria temática |
| `statement` | `string` | Texto da afirmação (mín. 10 caracteres) |
| `answer` | `boolean` | `true` = Verdadeiro, `false` = Falso |
| `explanation` | `string` | Explicação exibida após a resposta |
| `reference_url` | `string` (opcional) | Link para a documentação oficial |
| `difficulty_weight` | `1 \| 2` | Peso da dificuldade |

---

## Deploy na Vercel

```bash
npx vercel
```

Configure as variáveis de ambiente listadas acima no painel da Vercel. A OG image dinâmica (`/api/og`) roda no edge runtime.

---

## Testes

```bash
# Unitários
npm test

# E2E (necessita do servidor rodando)
npm run dev &
npm run test:e2e
```

Os testes E2E cobrem o fluxo completo: seleção de trilha → 10 perguntas → tela de resultado → compartilhamento. Navegação por teclado também é testada.

---

## Licença

MIT © [Felipe Abreu](https://github.com/felipeabreu)
