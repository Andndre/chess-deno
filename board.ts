import { Board, Piece, PieceColor, Pieces, PieceType } from "./mod.ts";
import { Arrays } from "./utils/mod.ts";

export const INIT_FEN_STRING = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
export const BOARD_SIZE = 64;
export const WHITE_KING_DEFAULT_POS = 60;
export const BLACK_KING_DEFAULT_POS = 4;
export const ROOK_DEFAULT_POS = [0, 7, 56, 63];

export function initPosition(board: Board) {
  const rows = INIT_FEN_STRING.split("/");
  let offset = 0;
  for (const row of rows) {
    for (const char of row) {
      if (char.match(/[0-9]/)) {
        const num = Number.parseInt(char);
        for (let i = offset; i <= offset + num; i++) {
          board[i] = {
            color: PieceColor.NONE,
            offset: i,
            type: PieceType.NONE,
            moved: 0,
          };
        }
        offset += num;
        continue;
      }
      const piece: Piece = {
        ...Pieces.fromChar(char),
        offset,
        moved: 0,
      };
      board[offset] = piece;
      offset++;
    }
  }
}

export function emptyBoard(board: Board = []) {
  Arrays.clear(board);
  board = Array(BOARD_SIZE).map((_, offset) => {
    return { offset, type: PieceType.NONE, color: PieceColor.NONE, moved: 0 };
  });
  return board;
}

export function copy(board: Board) {
  const result: Board = [];
  for (const piece of board) {
    result.push({ ...piece });
  }
  return result;
}

export function getKingIndex(board: Board, color: PieceColor) {
  for (let offset = 0; offset < BOARD_SIZE; offset++) {
    if (
      board[offset].type === PieceType.KING && board[offset].color === color
    ) {
      return offset;
    }
  }

  throw new Error("Wait... no king?");
}

/**
   Generated using this code

   ```ts
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const up = y;
        const down = 7 - y;
        const left = x;
        const right = 7 - x;

        console.log (JSON.stringify({
          up,
          down,
          left,
          right,
          upLeft: Math.min(up, left),
          upRight: Math.min(up, right),
          downLeft: Math.min(down, left),
          downRight: Math.min(down, right),
        }) + ',');
      }
    }
  ```
   */
export const numToEdge = [
  {
    "up": 0,
    "down": 7,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 0,
    "downRight": 7,
  },
  {
    "up": 0,
    "down": 7,
    "left": 1,
    "right": 6,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 1,
    "downRight": 6,
  },
  {
    "up": 0,
    "down": 7,
    "left": 2,
    "right": 5,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 2,
    "downRight": 5,
  },
  {
    "up": 0,
    "down": 7,
    "left": 3,
    "right": 4,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 3,
    "downRight": 4,
  },
  {
    "up": 0,
    "down": 7,
    "left": 4,
    "right": 3,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 4,
    "downRight": 3,
  },
  {
    "up": 0,
    "down": 7,
    "left": 5,
    "right": 2,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 5,
    "downRight": 2,
  },
  {
    "up": 0,
    "down": 7,
    "left": 6,
    "right": 1,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 6,
    "downRight": 1,
  },
  {
    "up": 0,
    "down": 7,
    "left": 7,
    "right": 0,
    "upLeft": 0,
    "upRight": 0,
    "downLeft": 7,
    "downRight": 0,
  },
  {
    "up": 1,
    "down": 6,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 1,
    "downLeft": 0,
    "downRight": 6,
  },
  {
    "up": 1,
    "down": 6,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 1,
    "downRight": 6,
  },
  {
    "up": 1,
    "down": 6,
    "left": 2,
    "right": 5,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 2,
    "downRight": 5,
  },
  {
    "up": 1,
    "down": 6,
    "left": 3,
    "right": 4,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 3,
    "downRight": 4,
  },
  {
    "up": 1,
    "down": 6,
    "left": 4,
    "right": 3,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 4,
    "downRight": 3,
  },
  {
    "up": 1,
    "down": 6,
    "left": 5,
    "right": 2,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 5,
    "downRight": 2,
  },
  {
    "up": 1,
    "down": 6,
    "left": 6,
    "right": 1,
    "upLeft": 1,
    "upRight": 1,
    "downLeft": 6,
    "downRight": 1,
  },
  {
    "up": 1,
    "down": 6,
    "left": 7,
    "right": 0,
    "upLeft": 1,
    "upRight": 0,
    "downLeft": 6,
    "downRight": 0,
  },
  {
    "up": 2,
    "down": 5,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 2,
    "downLeft": 0,
    "downRight": 5,
  },
  {
    "up": 2,
    "down": 5,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 2,
    "downLeft": 1,
    "downRight": 5,
  },
  {
    "up": 2,
    "down": 5,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 2,
    "downLeft": 2,
    "downRight": 5,
  },
  {
    "up": 2,
    "down": 5,
    "left": 3,
    "right": 4,
    "upLeft": 2,
    "upRight": 2,
    "downLeft": 3,
    "downRight": 4,
  },
  {
    "up": 2,
    "down": 5,
    "left": 4,
    "right": 3,
    "upLeft": 2,
    "upRight": 2,
    "downLeft": 4,
    "downRight": 3,
  },
  {
    "up": 2,
    "down": 5,
    "left": 5,
    "right": 2,
    "upLeft": 2,
    "upRight": 2,
    "downLeft": 5,
    "downRight": 2,
  },
  {
    "up": 2,
    "down": 5,
    "left": 6,
    "right": 1,
    "upLeft": 2,
    "upRight": 1,
    "downLeft": 5,
    "downRight": 1,
  },
  {
    "up": 2,
    "down": 5,
    "left": 7,
    "right": 0,
    "upLeft": 2,
    "upRight": 0,
    "downLeft": 5,
    "downRight": 0,
  },
  {
    "up": 3,
    "down": 4,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 3,
    "downLeft": 0,
    "downRight": 4,
  },
  {
    "up": 3,
    "down": 4,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 3,
    "downLeft": 1,
    "downRight": 4,
  },
  {
    "up": 3,
    "down": 4,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 3,
    "downLeft": 2,
    "downRight": 4,
  },
  {
    "up": 3,
    "down": 4,
    "left": 3,
    "right": 4,
    "upLeft": 3,
    "upRight": 3,
    "downLeft": 3,
    "downRight": 4,
  },
  {
    "up": 3,
    "down": 4,
    "left": 4,
    "right": 3,
    "upLeft": 3,
    "upRight": 3,
    "downLeft": 4,
    "downRight": 3,
  },
  {
    "up": 3,
    "down": 4,
    "left": 5,
    "right": 2,
    "upLeft": 3,
    "upRight": 2,
    "downLeft": 4,
    "downRight": 2,
  },
  {
    "up": 3,
    "down": 4,
    "left": 6,
    "right": 1,
    "upLeft": 3,
    "upRight": 1,
    "downLeft": 4,
    "downRight": 1,
  },
  {
    "up": 3,
    "down": 4,
    "left": 7,
    "right": 0,
    "upLeft": 3,
    "upRight": 0,
    "downLeft": 4,
    "downRight": 0,
  },
  {
    "up": 4,
    "down": 3,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 4,
    "downLeft": 0,
    "downRight": 3,
  },
  {
    "up": 4,
    "down": 3,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 4,
    "downLeft": 1,
    "downRight": 3,
  },
  {
    "up": 4,
    "down": 3,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 4,
    "downLeft": 2,
    "downRight": 3,
  },
  {
    "up": 4,
    "down": 3,
    "left": 3,
    "right": 4,
    "upLeft": 3,
    "upRight": 4,
    "downLeft": 3,
    "downRight": 3,
  },
  {
    "up": 4,
    "down": 3,
    "left": 4,
    "right": 3,
    "upLeft": 4,
    "upRight": 3,
    "downLeft": 3,
    "downRight": 3,
  },
  {
    "up": 4,
    "down": 3,
    "left": 5,
    "right": 2,
    "upLeft": 4,
    "upRight": 2,
    "downLeft": 3,
    "downRight": 2,
  },
  {
    "up": 4,
    "down": 3,
    "left": 6,
    "right": 1,
    "upLeft": 4,
    "upRight": 1,
    "downLeft": 3,
    "downRight": 1,
  },
  {
    "up": 4,
    "down": 3,
    "left": 7,
    "right": 0,
    "upLeft": 4,
    "upRight": 0,
    "downLeft": 3,
    "downRight": 0,
  },
  {
    "up": 5,
    "down": 2,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 5,
    "downLeft": 0,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 5,
    "downLeft": 1,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 5,
    "downLeft": 2,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 3,
    "right": 4,
    "upLeft": 3,
    "upRight": 4,
    "downLeft": 2,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 4,
    "right": 3,
    "upLeft": 4,
    "upRight": 3,
    "downLeft": 2,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 5,
    "right": 2,
    "upLeft": 5,
    "upRight": 2,
    "downLeft": 2,
    "downRight": 2,
  },
  {
    "up": 5,
    "down": 2,
    "left": 6,
    "right": 1,
    "upLeft": 5,
    "upRight": 1,
    "downLeft": 2,
    "downRight": 1,
  },
  {
    "up": 5,
    "down": 2,
    "left": 7,
    "right": 0,
    "upLeft": 5,
    "upRight": 0,
    "downLeft": 2,
    "downRight": 0,
  },
  {
    "up": 6,
    "down": 1,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 6,
    "downLeft": 0,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 6,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 5,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 3,
    "right": 4,
    "upLeft": 3,
    "upRight": 4,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 4,
    "right": 3,
    "upLeft": 4,
    "upRight": 3,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 5,
    "right": 2,
    "upLeft": 5,
    "upRight": 2,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 6,
    "right": 1,
    "upLeft": 6,
    "upRight": 1,
    "downLeft": 1,
    "downRight": 1,
  },
  {
    "up": 6,
    "down": 1,
    "left": 7,
    "right": 0,
    "upLeft": 6,
    "upRight": 0,
    "downLeft": 1,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 0,
    "right": 7,
    "upLeft": 0,
    "upRight": 7,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 1,
    "right": 6,
    "upLeft": 1,
    "upRight": 6,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 2,
    "right": 5,
    "upLeft": 2,
    "upRight": 5,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 3,
    "right": 4,
    "upLeft": 3,
    "upRight": 4,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 4,
    "right": 3,
    "upLeft": 4,
    "upRight": 3,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 5,
    "right": 2,
    "upLeft": 5,
    "upRight": 2,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 6,
    "right": 1,
    "upLeft": 6,
    "upRight": 1,
    "downLeft": 0,
    "downRight": 0,
  },
  {
    "up": 7,
    "down": 0,
    "left": 7,
    "right": 0,
    "upLeft": 7,
    "upRight": 0,
    "downLeft": 0,
    "downRight": 0,
  },
];
// }
