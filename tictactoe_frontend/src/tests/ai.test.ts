import { chooseAIMove } from "@/lib/game/ai";
import { type GameState } from "@/lib/game/engine";

function stateFrom(board: (("X" | "O") | null)[][], current: "X" | "O"): GameState {
  return { board: board, current, winner: null, finished: false };
}

describe("ai", () => {
  test("chooses winning move when available", () => {
    const s = stateFrom(
      [
        ["X", "X", null],
        ["O", "O", null],
        [null, null, null],
      ],
      "X"
    );
    const mv = chooseAIMove(s);
    expect(mv).toEqual({ row: 0, col: 2 });
  });

  test("blocks opponent immediate win", () => {
    const s = stateFrom(
      [
        ["O", "O", null],
        ["X", null, null],
        [null, null, "X"],
      ],
      "X"
    );
    const mv = chooseAIMove(s);
    // block at (0,2)
    expect(mv).toEqual({ row: 0, col: 2 });
  });

  test("returns null when no moves", () => {
    const s = stateFrom(
      [
        ["X", "O", "X"],
        ["X", "O", "O"],
        ["O", "X", "X"],
      ],
      "X"
    );
    const mv = chooseAIMove(s);
    expect(mv).toBeNull();
  });
});
