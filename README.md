# AI Deterministic UI Generator

## Overview
A production-leaning Next.js application that turns natural language prompts into deterministic React UI plans, generated code, and live previews with versioning and rollback.

## Architecture Diagram
```text
User Prompt
   │
   ▼
Planner Agent (JSON plan only)
   │
   ▼
Validator Layer (whitelist, injection, output checks)
   │
   ▼
Generator Agent (React code)
   │
   ▼
Explainer Agent (tradeoffs + changes)
   │
   ▼
Version Manager + API SSE stream + Live Preview
```

## Agent Workflow
- **Planner**: intent parsing and deterministic component-plan generation (`agents/planner.ts`).
- **Generator**: converts plan JSON to React TSX (`agents/generator.ts`).
- **Explainer**: human-readable rationale and delta summary (`agents/explainer.ts`).
- **Validator**: prompt filtering, component whitelist enforcement, generated-code checks (`lib/validation.ts`).

## Deterministic Component Library
Allowed components only:
- Button
- Card
- Input
- Table
- Modal
- Sidebar
- Navbar
- Chart

All components are implemented with fixed styles and strict typed props in `/components`.

## Key Features
- Claude-style split layout (chat, code, preview).
- Streaming backend endpoint (`/api/agent`) via SSE-compatible response.
- Incremental iteration with plan diff and version history rollback.
- Optional voice input using Web Speech API.
- Monaco code editor and live deterministic preview renderer.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   echo 'DATABASE_URL="file:./dev.db"' > .env
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Start dev server:
   ```bash
   npm run dev
   ```

## Example Prompts
- `Create a dashboard with sidebar, navbar and analytics cards`
- `Add settings modal`
- `Make layout minimal`
- `Add chart inside card`

## Local Run Guide
- Open `http://localhost:3000`
- Enter prompt in chat panel
- Click **Generate UI**
- Inspect generated code and explanation
- Use **Rollback** to revert one version

## Deployment (Vercel)
- Push repository to GitHub.
- Import project in Vercel.
- Set `DATABASE_URL` env var.
- Run build command: `npm run build`.

## Monitoring Hooks
- Add logging around `server/agentController.ts` for planner/generator latency.
- Add API route timing metrics and error counters.

## Known Limitations
- Planner is keyword-based and deterministic by design.
- Preview renders plan tree (not arbitrary user-edited code execution).
- Version persistence is currently in-memory (schema included for DB extension).

## Future Improvements
- AST-level incremental patching for generated code.
- Persist conversations and revisions via Prisma write/read.
- Add visual diff timeline and replay.
