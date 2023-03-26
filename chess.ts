import {
  Board,
  Boards,
  ChessState,
  Move,
  PieceColor,
  PieceType,
} from "./mod.ts";
import { Arrays } from "./utils/mod.ts";

export type GameOverReason = "" | "checkMate" | "staleMate";

export interface ChessProps {
  /**
   * Usefull when implementing a multiplayer chess game -
   * This will prevent user action on selecting or moving
   * other player's piece
   *
   * For black:
   * ```ts
   * freezeOn = [PieceColor.WHITE]
   * ```
   *
   * For white:
   * ```ts
   * freezeOn = [PieceColor.BLACK]
   * ```
   *
   * For watcher (cannot move):
   * ```ts
   * freezeOn = [PieceColor.WHITE, PieceColor.BLACK]
   * ```
   *
   * For simulating other player's move, you can use the
   * `simulateClicksToMove` function that will require you
   * to pass in
   * `{from: number, to: number, promoteTo?: PieceType}`
   */
  freezeOn?: PieceColor[];
  onGameOver?: (reason: GameOverReason) => void;
  onMove?: (move: Move) => void;
  onCastle?: (move: Move) => void;
  onCapture?: (move: Move) => void;
  onEnpassant?: (move: Move) => void;
  onUndo?: (move: Move) => void;
}

export class Chess {
  board: Board;
  validMoves: Move[][] = [];
  moveHistory: Move[] = [];
  selectedOffset = -1;
  current: PieceColor = PieceColor.WHITE;
  gameOver = false;
  gameOverReason: GameOverReason = "";
  freezeOn: PieceColor[] = [];
  onGameOver: (reason: GameOverReason) => void;
  onMove: (move: Move) => void;
  onCastle: (move: Move) => void;
  onCapture: (move: Move) => void;
  onEnpassant: (move: Move) => void;
  onUndo: (move: Move) => void;

  constructor(
    { freezeOn, onCapture, onCastle, onEnpassant, onGameOver, onMove, onUndo }:
      ChessProps,
  ) {
    this.board = Boards.emptyBoard();
    Boards.initPosition(this.board);
    this.generateMoves();
    this.freezeOn = freezeOn || [];
    const _onmove = () => {};
    const _onundo = () => {};
    const _oncapture = () => {};
    const _oncastle = () => {};
    const _onenpassant = () => {};
    const _ongameover = () => {};
    this.onMove = onMove || _onmove;
    this.onUndo = onUndo || _onundo;
    this.onCapture = onCapture || _oncapture;
    this.onCastle = onCastle || _oncastle;
    this.onEnpassant = onEnpassant || _onenpassant;
    this.onGameOver = onGameOver || _ongameover;
  }

  /**
   * Switch current player && generate available moves
   */
  next() {
    this.onMove(this.getLastMove()!);
    ChessState.next(this);
  }

  generateMoves() {
    const gameover = ChessState.generateMoves(this);
    if (gameover) {
      this.onGameOver(this.gameOverReason);
    }
  }

  isPromote() {
    return ChessState.isPromote(this);
  }

  /**
   * Perform `select`, `move`, or `deselect` automatically
   *
   * @param offset
   */
  clickTile(offset: number, force = false) {
    return ChessState.clickTile(this, offset, force);
  }

  /**
   * @param from first click
   * @param to second click
   * @param promoteTo third click (if promoting)
   *
   * @returns true if the move is valid
   */
  simulateClicksToMove(from: number, to: number, promoteTo?: PieceType) {
    return ChessState.simulateClicksToMove(this, from, to, promoteTo);
  }

  promoteLastMoveTo(type: PieceType) {
    ChessState.promoteLastMoveTo(this, type);
  }

  getLastMove() {
    return Arrays.last(this.moveHistory);
  }

  lastMoveColor() {
    return ChessState.lastMoveColor(this);
  }

  move(move: Move) {
    const { capture, castle, enPassant } = ChessState.move(this, move);
    if (capture) this.onCapture(move);
    if (castle) this.onCastle(move);
    if (enPassant) this.onEnpassant(move);
  }

  undo() {
    const move = ChessState.undo(this);
    if (move) {
      this.onUndo(move);
    }
  }

  setRole(role: "black" | "white" | "watching") {
    ChessState.setRole(this, role);
  }
}
