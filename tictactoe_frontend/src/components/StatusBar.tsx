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
export function StatusBar({ status, onReset }: StatusBarProps) {
  /** Public component: shows game status and reset button. */
  return (
    <>
      <span className="text-sm font-medium">{status}</span>
      <button className="btn btn-primary" onClick={onReset} aria-label="Reset game">
        Reset
      </button>
    </>
  );
}
