# Tic Tac Toe — Ocean Professional

Production-ready Next.js app delivering a modern, accessible Tic Tac Toe game with PvP and AI modes, built with TypeScript and GxP-compliant scaffolding.

## Features
- Ocean Professional theme with responsive, centered layout
- 3x3 board with keyboard and mouse support
- PvP and Player vs AI modes (minimax with alpha-beta pruning)
- Status indicator, reset, and win/draw detection
- GxP scaffolding: ALCOA+ audit trail hooks, validation utilities, RBAC placeholders
- Error handling with user-friendly toasts and internal logging
- Unit tests covering core logic (engine, validators, AI)

## Getting Started
- Dev (default port 3000):
  npm run dev

- Build:
  npm run build

- Start:
  npm run start

Open http://localhost:3000 to play.

## Project Structure
- src/app: Next.js app router pages and layout
- src/components: UI components (GameBoard, StatusBar, ModeToggle, AuditTrailViewer)
- src/lib/game: Core logic (engine, validators, ai)
- src/lib/compliance: Audit trail, access control, errors
- src/lib/ui: Toast utilities
- src/tests: Jest unit tests

## Compliance Notes (GxP)
- Audit Trail (src/lib/compliance/audit.ts)
  - Captures ISO timestamp, userId, action (CREATE/READ/UPDATE/DELETE/ERROR), before/after, reason
  - In-memory store for demo; replace with append-only persistent storage for production
- Validation (src/lib/game/validators.ts)
  - Ensures bounds, empty cell, and game not finished before move
- Error Handling (src/lib/compliance/errors.ts, toast UI)
  - Domain-specific errors (ValidationError, AuthorizationError) with conversion helper
- Access Control (src/lib/compliance/access.ts)
  - ensureRole() guard; extend Role/Operation mapping for real RBAC
- Electronic signature
  - Not required for this demo; placeholders can be added at critical operations in future

## Testing
- Run unit tests:
  npm test

- Coverage target: >=80% for core logic files (engine, validators, ai)
- Tests:
  - src/tests/engine.test.ts
  - src/tests/validators.test.ts
  - src/tests/ai.test.ts

## Assumptions
- No external services or authentication are configured; userId is "anonymous"
- Audit trail is retained in-memory; not persisted across reloads
- Next.js 15 with React 19 app router
