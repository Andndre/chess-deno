import { Chess, Move, Moves, PieceColor, Pieces, PieceType } from "./mod.ts";
import { Arrays } from "./utils/mod.ts";

export function setRole(chess: Chess, role: "black" | "white" | "watching") {
  Arrays.clear(chess.freezeOn);
  if (role === "black") {
    chess.freezeOn.push(PieceColor.WHITE);
  } else if (role === "white") {
    chess.freezeOn.push(PieceColor.BLACK);
  } else {
    chess.freezeOn.push(PieceColor.BLACK, PieceColor.WHITE);
  }
}

export function isPromote(chess: Chess) {
  const lastMove = getLastMove(chess);
  if (!lastMove) return false;

  return !!lastMove.promoteToType;
}

/**
 * Perform `select`, `move`, or `deselect` automatically
 *
 * @param offset
 */
export function clickTile(chess: Chess, offset: number, force = false) {
  if (!force) {
    if (chess.freezeOn.includes(chess.current)) {
      return "frozen";
    }
  }
  const isFriendly = chess.board[offset].color === chess.current;
  if (isFriendly) {
    // select
    chess.selectedOffset = offset;
    return "select";
  } else if (
    chess.selectedOffset != -1 &&
    chess.validMoves[chess.selectedOffset].find((move) => move.to === offset)
  ) {
    // move
    const found = chess.validMoves[chess.selectedOffset].find((move) => {
      return move.to === offset;
    })!;
    move(chess, found);
    chess.selectedOffset = -1;
    return "move";
  }
  // deselect
  chess.selectedOffset = -1;

  return "deselect";
}

/**
 * @param from first click
 * @param to second click
 * @param promoteTo third click (if promoting)
 *
 * @returns true if the move is valid
 */
export function simulateClicksToMove(
  chess: Chess,
  from: number,
  to: number,
  promoteTo?: PieceType,
) {
  if (
    !chess.validMoves[from].find((move) => move.to === to)
  ) {
    return false;
  }

  clickTile(chess, from, true);
  clickTile(chess, to, true);
  if (promoteTo) {
    if (!isPromote(chess)) {
      undo(chess);
      throw new Error(
        "The move cannot be performed because the move was not supposed to be a promoting move",
      );
    }
    promoteLastMoveTo(chess, promoteTo);
  }

  // TODO: make a iterable version of this function so that we don't need to call the generate function over and over
  chess.current = Pieces.invertColor(chess.current);
  generateMoves(chess);
  return true;
}

export function promoteLastMoveTo(chess: Chess, type: PieceType) {
  const lastMove = getLastMove(chess);
  if (!lastMove) return;
  lastMove.promoteToType = type;
  chess.board[lastMove.to].type = type;
}

export function getLastMove(chess: Chess) {
  return Arrays.last(chess.moveHistory);
}

export function lastMoveColor(chess: Chess) {
  const lastMove = getLastMove(chess);
  if (!lastMove) return null;
  return chess.board[lastMove.to].color;
}

export function move(chess: Chess, move: Move) {
  chess.moveHistory.push(move);
  return Moves.move(chess.board, move);
  //   if (capture) chess.onCapture(move);
  //   if (castle) chess.onCastle(move);
  //   if (enPassant) chess.onEnpassant(move);
}

export function undo(chess: Chess) {
  const move = chess.moveHistory.pop();
  if (!move) return;
  Moves.undoMove(chess.board, move);
  //   chess.onUndo(move);
  next(chess);
  return move;
}

/**
 * Switch current player && generate available moves
 */
export function next(chess: Chess) {
  //   chess.onMove(getLastMove(chess)!);
  chess.current = Pieces.invertColor(chess.current);
  generateMoves(chess);
}

export function generateMoves(chess: Chess) {
  if (chess.gameOver) return;
  Arrays.clear(chess.validMoves);
  const { moves, checkMate, staleMate } = Moves.generateMoves(
    chess,
  );
  if (checkMate) {
    chess.gameOver = true;
    chess.gameOverReason = "checkMate";
    chess.onGameOver(chess.gameOverReason);
  } else if (staleMate) {
    chess.gameOver = true;
    chess.gameOverReason = "staleMate";
    chess.onGameOver(chess.gameOverReason);
  }

  chess.validMoves.push(...moves);
}
