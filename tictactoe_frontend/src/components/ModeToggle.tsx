"use client";

import React from "react";
import { GameMode } from "@/lib/game/engine";

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-UI-MODE
// User Story: Toggle between PvP and AI modes.
// Acceptance Criteria: Accessible toggle, emits onChange.
// GxP Impact: NO (UI only). Audit happens in page handler.
// Risk Level: LOW
// ============================================================================
 */

export type ModeToggleProps = {
  mode: GameMode;
  onChange: (m: GameMode) => void;
};

export function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div role="group" aria-label="Game mode">
      <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
        <button
          className={`px-3 py-2 text-sm ${mode === "PVP" ? "bg-[var(--color-primary)] text-white" : "bg-white"}`}
          aria-pressed={mode === "PVP"}
          onClick={() => onChange("PVP")}
        >
          PvP
        </button>
        <button
          className={`px-3 py-2 text-sm ${mode === "AI" ? "bg-[var(--color-primary)] text-white" : "bg-white"}`}
          aria-pressed={mode === "AI"}
          onClick={() => onChange("AI")}
        >
          AI
        </button>
      </div>
    </div>
  );
}
