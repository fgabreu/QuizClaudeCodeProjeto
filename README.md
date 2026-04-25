# Claude Code Quiz

Quiz educacional Verdadeiro/Falso sobre Claude Code — CLI, Agent SDK e ecossistema Anthropic.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes E2E (Playwright) |
| `npm run type-check` | Verificação TypeScript |
| `npm run lint` | ESLint |

## Adicionar perguntas

Edite `data/questions.json` seguindo o schema:

```json
{
  "id": "q-xxx",
  "track": "iniciante" | "intermediario" | "avancado",
  "category": "modelos" | "hooks" | ...,
  "statement": "Texto da pergunta.",
  "answer": true | false,
  "explanation": "Explicação curta.",
  "reference_url": "https://docs.anthropic.com/...",
  "difficulty_weight": 1 | 2
}
```

O schema é validado com Zod em build time — o build falha se houver dados inválidos.

## Deploy

```bash
npx vercel
```

Configure `NEXT_PUBLIC_BASE_URL` nas variáveis de ambiente da Vercel.
# QuizClaudeCodeProjeto
