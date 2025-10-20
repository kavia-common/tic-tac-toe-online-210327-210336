import { isInBounds, isCellEmpty, isGameActive, isValidMove } from "@/lib/game/validators";
import { emptyBoard, type GameState } from "@/lib/game/engine";

describe("validators", () => {
  const base: GameState = { board: emptyBoard(), current: "X", winner: null, finished: false };

  test("isInBounds works", () => {
    expect(isInBounds(0, 0)).toBe(true);
    expect(isInBounds(2, 2)).toBe(true);
    expect(isInBounds(-1, 0)).toBe(false);
    expect(isInBounds(0, 3)).toBe(false);
  });

  test("isCellEmpty checks cell", () => {
    const s = { ...base, board: emptyBoard() };
    s.board[1][1] = "X";
    expect(isCellEmpty(s, 1, 1)).toBe(false);
    expect(isCellEmpty(s, 0, 0)).toBe(true);
  });

  test("isGameActive and isValidMove", () => {
    const s = { ...base };
    expect(isGameActive(s)).toBe(true);
    expect(isValidMove(s, 0, 0)).toBe(true);
    s.board[0][0] = "X";
    expect(isValidMove(s, 0, 0)).toBe(false);
    const finished = { ...s, finished: true };
    expect(isValidMove(finished, 1, 1)).toBe(false);
  });
});
