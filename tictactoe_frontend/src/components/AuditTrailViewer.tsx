"use client";

import React from "react";
import { getAuditTrail } from "@/lib/compliance/audit";

/**
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-AUDIT-VIEW
// User Story: I want to see the audit events for transparency.
// Acceptance Criteria: Renders recent audit entries.
// GxP Impact: YES (Read-only view of audit trail).
// Risk Level: LOW
// ============================================================================
 */

export type AuditTrailViewerProps = {
  className?: string;
  id?: string;
};

// PUBLIC_INTERFACE
export function AuditTrailViewer({ className, id }: AuditTrailViewerProps) {
  /** Public component: shows audit trail entries. */
  const events = getAuditTrail();

  return (
    <div className={`panel p-3 ${className ?? ""}`} id={id} role="region" aria-label="Audit trail viewer">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold">Audit Trail</h2>
        <span className="text-xs text-gray-500">{events.length} events</span>
      </div>
      <ol className="space-y-2 max-h-64 overflow-auto">
        {events.map((e) => (
          <li key={e.id} className="text-xs">
            <div className="flex items-center gap-2">
              <span className="badge">{e.action}</span>
              <span className="text-gray-700">{e.entity}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{new Date(e.timestamp).toLocaleTimeString()}</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">user: {e.userId}</span>
            </div>
            {e.reason && <div className="text-gray-600 mt-0.5">Reason: {e.reason}</div>}
            {e.error && <div className="text-red-600 mt-0.5">Error: {e.error}</div>}
          </li>
        ))}
        {events.length === 0 && <li className="text-gray-500">No audit events yet.</li>}
      </ol>
    </div>
  );
}
