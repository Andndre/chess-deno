export type Board = Piece[];
export interface BasicPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Piece extends BasicPiece {
  offset: number;
  moved: number;
}

export enum PieceColor {
  NONE,
  WHITE,
  BLACK,
}

// export enum PieceScore {
//   NONE,
//   PAWN = 1,
//   KNIGHT = 3,
//   BISHOP = 3,
//   ROOK = 5,
//   QUEEN = 9,
//   KING = Infinity,
// }

export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
  NONE,
}

export interface Move {
  from: number;
  to: number;
  captureType: PieceType;
  check?: number;
  // used when `castling`
  resultingMove?: Move;
  // used when `promoting`
  promoteToType?: PieceType;
  // used when `enpassant`
  captureIndex?: number;
}

export interface MoveLine {
  dir: { x: number; y: number };
  steps: number;
}

export enum Direction {
  UP = -8,
  DOWN = 8,
  LEFT = -1,
  RIGHT = 1,
}

export interface Vec2 {
  x: number;
  y: number;
}
