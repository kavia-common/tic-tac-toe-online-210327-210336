"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GameBoard } from "@/components/GameBoard";
import { ModeToggle } from "@/components/ModeToggle";
import { StatusBar } from "@/components/StatusBar";
import { AuditTrailViewer } from "@/components/AuditTrailViewer";
import { auditLog } from "@/lib/compliance/audit";
import { ensureRole } from "@/lib/compliance/access";
import { AppError, ValidationError } from "@/lib/compliance/errors";
import { ToastHost, toast } from "@/lib/ui/toast";
import {
  GameMode,
  GameState,
  emptyBoard,
  cloneState,
  applyMove,
} from "@/lib/game/engine";
import { isValidMove } from "@/lib/game/validators";
import { chooseAIMove } from "@/lib/game/ai";

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-FE-001
// User Story: As a user, I want to play Tic Tac Toe in my browser against a human or AI.
// Acceptance Criteria:
//  - Themed UI loads with centered board and controls
//  - Board supports valid moves, win/draw detection, reset
//  - Mode toggle for PvP and vs AI
//  - Audit trail logs for new game, move, and mode change
//  - Validation prevents invalid moves
//  - Friendly error messages via toasts; robust internal logging
//  - RBAC placeholders present
// GxP Impact: YES - audit trail, validation controls, access control placeholders
// Risk Level: LOW
// Validation Protocol: VP-TTT-FE-001
// ============================================================================
 */

export default function Home() {
  const [mode, setMode] = useState<GameMode>("PVP");
  const [state, setState] = useState<GameState>({
    board: emptyBoard(),
    current: "X",
    winner: null,
    finished: false,
  });
  const [auditOpen, setAuditOpen] = useState(false);

  const userId = "anonymous"; // placeholder; integrate with auth in future
  const userRole = "user"; // placeholder role

  // Log initial load
  useEffect(() => {
    auditLog({
      action: "READ",
      entity: "APP",
      userId,
      reason: "Page load",
      after: { mode },
    });
  }, [mode]);

  const startNewGame = useCallback(() => {
    try {
      ensureRole(userRole, "CREATE_GAME");
      const before = cloneState(state);
      const newState: GameState = {
        board: emptyBoard(),
        current: "X",
        winner: null,
        finished: false,
      };
      setState(newState);
      auditLog({
        action: "CREATE",
        entity: "GAME",
        userId,
        reason: "User started a new game",
        before,
        after: newState,
      });
      toast.success("New game started");
    } catch (e) {
      const err = AppError.from(e);
      auditLog({
        action: "ERROR",
        entity: "GAME",
        userId,
        reason: "Failed to start new game",
        after: { message: err.message, code: err.code },
      });
      toast.error(err.message);
    }
  }, [state, userRole, userId]);

  const onModeChange = useCallback(
    (next: GameMode) => {
      try {
        ensureRole(userRole, "UPDATE_SETTINGS");
        const before = { mode };
        setMode(next);
        auditLog({
          action: "UPDATE",
          entity: "SETTINGS",
          userId,
          reason: "Game mode changed",
          before,
          after: { mode: next },
        });
        toast.info(`Mode: ${next === "PVP" ? "Player vs Player" : "Player vs AI"}`);
      } catch (e) {
        const err = AppError.from(e);
        toast.error(err.message);
      }
    },
    [mode, userRole, userId]
  );

  const handleMove = useCallback(
    (row: number, col: number) => {
      try {
        if (state.finished) {
          throw new ValidationError("Game is finished.");
        }
        if (!isValidMove(state, row, col)) {
          throw new ValidationError("Invalid move.");
        }

        const before = cloneState(state);
        const afterHuman = applyMove(state, row, col);

        auditLog({
          action: "UPDATE",
          entity: "MOVE",
          userId,
          reason: "Human move",
          before,
          after: afterHuman,
        });

        setState(afterHuman);

        // If AI mode and game not finished, AI plays
        if (mode === "AI" && !afterHuman.finished) {
          const aiMove = chooseAIMove(afterHuman);
          if (aiMove) {
            const beforeAI = cloneState(afterHuman);
            const afterAI = applyMove(afterHuman, aiMove.row, aiMove.col);

            auditLog({
              action: "UPDATE",
              entity: "MOVE",
              userId: "ai-agent",
              reason: "AI move",
              before: beforeAI,
              after: afterAI,
            });

            setState(afterAI);
          }
        }
      } catch (e) {
        const err = AppError.from(e);
        auditLog({
          action: "ERROR",
          entity: "MOVE",
          userId,
          after: { message: err.message, code: err.code },
        });
        toast.error(err.message);
      }
    },
    [mode, state, userId]
  );

  const statusText = useMemo(() => {
    if (state.finished) {
      if (state.winner) return `Winner: ${state.winner}`;
      return "It's a draw!";
    }
    return `Turn: ${state.current}`;
  }, [state]);

  return (
    <main className="container-center">
      <ToastHost />
      <section className="panel w-full max-w-xl p-5">
        <header className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight" aria-label="Tic Tac Toe Heading">
              Tic Tac Toe
            </h1>
            <p className="text-sm text-gray-600">Ocean Professional Theme</p>
          </div>
          <span className="badge" aria-label={`Game mode: ${mode}`}>
            <span className="w-2 h-2 rounded-full" style={{ background: "var(--color-primary)" }} />
            {mode === "PVP" ? "PvP" : "AI"}
          </span>
        </header>

        <div className="status-bar mb-3">
          <StatusBar status={statusText} onReset={startNewGame} />
          <ModeToggle mode={mode} onChange={onModeChange} />
        </div>

        <GameBoard
          state={state}
          onMove={handleMove}
          aria-label="Tic Tac Toe Game Board"
        />

        <hr className="hr" />

        <div className="flex items-center justify-between mt-2">
          <button
            className="btn"
            onClick={() => setAuditOpen((v) => !v)}
            aria-expanded={auditOpen}
            aria-controls="audit-panel"
          >
            View Audit Trail
          </button>

          <div className="text-xs text-gray-500">
            Accessibility: Arrow keys to navigate cells; Enter/Space to mark.
          </div>
        </div>

        {auditOpen && <AuditTrailViewer id="audit-panel" className="mt-3" />}
      </section>
    </main>
  );
}
