"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { GameState } from "@/lib/game/engine";
import { PlayerIcon, iconLabelFor } from "@/lib/ui/icons";

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-UI-BOARD
// User Story: As a player, I want to interact with a 3x3 board.
// Acceptance Criteria: 3x3 grid, keyboard & mouse input, disabled when finished.
// GxP Impact: NO (UI only) - logic audited upstream.
// Risk Level: LOW
// ============================================================================
 */

export type GameBoardProps = {
  state: GameState;
  onMove: (row: number, col: number) => void;
} & React.HTMLAttributes<HTMLDivElement>;

// PUBLIC_INTERFACE
export function GameBoard({ state, onMove, ...divProps }: GameBoardProps) {
  /** This is a public function. Renders a 3x3 grid of cells. */

  const cellsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClick = useCallback(
    (row: number, col: number) => {
      onMove(row, col);
    },
    [onMove]
  );

  useEffect(() => {
    // keep focus within board if needed
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const focusable = cellsRef.current.filter(Boolean) as HTMLButtonElement[];
    const index = focusable.indexOf(document.activeElement as HTMLButtonElement);
    const row = Math.floor(index / 3);
    const col = index % 3;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusable[(index + 1) % 9]?.focus();
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusable[(index + 8) % 9]?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        focusable[(index + 3) % 9]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        focusable[(index + 6) % 9]?.focus();
        break;
      case " ":
      case "Enter":
        e.preventDefault();
        if (row >= 0 && col >= 0) handleClick(row, col);
        break;
    }
  };

  return (
    <div
      role="grid"
      aria-label="Game board"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="board mx-auto"
      {...divProps}
    >
      {state.board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const idx = rIdx * 3 + cIdx;
          const disabled = !!cell || state.finished;
          return (
            <button
              key={`${rIdx}-${cIdx}`}
              ref={(el) => {
                cellsRef.current[idx] = el;
              }}
              role="gridcell"
              aria-colindex={cIdx + 1}
              aria-rowindex={rIdx + 1}
              aria-label={`Cell ${rIdx + 1},${cIdx + 1} ${cell ? `occupied by ${iconLabelFor(cell)}` : "empty"}`}
              className={`cell ${disabled ? "disabled" : ""}`}
              onClick={() => handleClick(rIdx, cIdx)}
              disabled={disabled}
            >
              {cell ? <PlayerIcon player={cell} size={24} /> : ""}
            </button>
          );
        })
      )}
    </div>
  );
}
