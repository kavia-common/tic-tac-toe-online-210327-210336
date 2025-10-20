import type { Metadata } from "next";
import "./globals.css";

/**
 * Root layout for Tic Tac Toe frontend (Ocean Professional theme).
 * Provides global theming, accessibility language settings, and container.
 */
export const metadata: Metadata = {
  title: "Tic Tac Toe — Ocean Professional",
  description: "Modern Tic Tac Toe game with PvP and AI modes (GxP scaffolding).",
  applicationName: "Tic Tac Toe",
  authors: [{ name: "Kavia CodeGen" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563EB",
  other: {
    "x-gxp-compliance": "ALCOA+ audit trail, validation scaffolding, RBAC placeholders",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="root">{children}</div>
        <div id="toast-root" aria-live="polite" aria-atomic="true" />
      </body>
    </html>
  );
}
