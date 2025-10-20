import { applyMove, detectWinner, emptyBoard, isDraw, nextPlayer, type GameState } from "@/lib/game/engine";

describe("engine", () => {
  test("emptyBoard creates 3x3 nulls", () => {
    const b = emptyBoard();
    expect(b).toHaveLength(3);
    expect(b[0]).toHaveLength(3);
    expect(b.flat().every((c) => c === null)).toBe(true);
  });

  test("nextPlayer flips correctly", () => {
    expect(nextPlayer("X")).toBe("O");
    expect(nextPlayer("O")).toBe("X");
  });

  test("detectWinner rows/cols/diags", () => {
    const b = emptyBoard();
    b[0] = ["X", "X", "X"];
    expect(detectWinner(b)).toBe("X");

    const c = emptyBoard();
    c[0][1] = "O";
    c[1][1] = "O";
    c[2][1] = "O";
    expect(detectWinner(c)).toBe("O");

    const d = emptyBoard();
    d[0][0] = "X";
    d[1][1] = "X";
    d[2][2] = "X";
    expect(detectWinner(d)).toBe("X");
  });

  test("isDraw true when board full and no winner", () => {
    const b = [
      ["X", "O", "X"],
      ["X", "O", "O"],
      ["O", "X", "X"],
    ];
    expect(isDraw(b)).toBe(true);
  });

  test("applyMove updates state and switches player", () => {
    const s: GameState = { board: emptyBoard(), current: "X", winner: null, finished: false };
    const s2 = applyMove(s, 0, 0);
    expect(s2.board[0][0]).toBe("X");
    expect(s2.current).toBe("O");
    expect(s.current).toBe("X"); // immutable
  });

  test("applyMove sets winner and finishes", () => {
    const s: GameState = {
      board: [
        ["X", "X", null],
        ["O", "O", null],
        [null, null, null],
      ],
      current: "X",
      winner: null,
      finished: false,
    };
    const s2 = applyMove(s, 0, 2);
    expect(s2.winner).toBe("X");
    expect(s2.finished).toBe(true);
  });
});
