"use client";

import React from "react";

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-UI-STATUS
// User Story: See current status and reset quickly.
// Acceptance Criteria: Status text, Reset button.
// GxP Impact: NO (UI only). Audit in page handler.
// Risk Level: LOW
// ============================================================================
 */

export type StatusBarProps = {
  status: string;
  onReset: () => void;
};

// PUBLIC_INTERFACE
import { PlayerIcon } from "@/lib/ui/icons";

export function StatusBar({ status, onReset }: StatusBarProps) {
  /** Public component: shows game status and reset button. */
  const renderStatus = () => {
    // Expected inputs: "Turn: X" | "Turn: O" | "Winner: X" | "Winner: O" | "It's a draw!"
    if (status.startsWith("Turn: ")) {
      const p = status.trim().endsWith("X") ? "X" : status.trim().endsWith("O") ? "O" : null;
      if (p) {
        return (
          <span className="text-sm font-medium">
            Turn: <PlayerIcon player={p as "X" | "O"} />
          </span>
        );
      }
    }
    if (status.startsWith("Winner: ")) {
      const p = status.trim().endsWith("X") ? "X" : status.trim().endsWith("O") ? "O" : null;
      if (p) {
        return (
          <span className="text-sm font-medium">
            Winner: <PlayerIcon player={p as "X" | "O"} />
          </span>
        );
      }
    }
    return <span className="text-sm font-medium">{status}</span>;
  };

  return (
    <>
      {renderStatus()}
      <button
        className="btn btn-primary"
        onClick={onReset}
        aria-label="Reset game"
        onFocus={(e) => (e.currentTarget.style.boxShadow = "var(--ring)")}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      >
        Reset
      </button>
    </>
  );
}
