import React from "react";
import { render, screen } from "@testing-library/react";
import { PlayerIcon, iconLabelFor } from "@/lib/ui/icons";

describe("icons", () => {
  test("renders knight for X with accessible label", () => {
    render(<PlayerIcon player="X" />);
    const el = screen.getByLabelText(iconLabelFor("X"));
    expect(el).toBeInTheDocument();
  });

  test("renders queen for O with accessible label", () => {
    render(<PlayerIcon player="O" />);
    const el = screen.getByLabelText(iconLabelFor("O"));
    expect(el).toBeInTheDocument();
  });
});
