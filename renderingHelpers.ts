import { Boards, Chess, ChessState } from "./mod.ts";
import { Arrays, Coords } from "./utils/mod.ts";

const _2dOffset: number[][] = [];
const _2dOffsetFlipped: number[][] = [];

for (let y = 0; y < 8; y++) {
  _2dOffset.push([]);
  _2dOffsetFlipped.push([]);
  for (let x = 0; x < 8; x++) {
    _2dOffset[y].push(Coords.getOffset(x, y));
    _2dOffsetFlipped[y].push(Coords.getOffset(7 - x, 7 - y));
  }
}

/**
  Used for rendering the board in 2D (since the board is 1D array)
 */
export const twoDimensionalOffset = _2dOffset;
/**
 * `twoDimensionalOffset` but flipped (used when rendering black side view)
 */
export const twoDimensionalOffsetFlipped = _2dOffsetFlipped;

export const lightTileColor = "#f2dcb6";
export const darkTileColor = "#b57d45";

export const getTileBackgroundColor = (offset: number) => {
  return (offset + Math.floor(offset / 8)) % 2 == 0
    ? lightTileColor
    : darkTileColor;
};

export const getTileBackgroundColorWithVec2 = (x: number, y: number) => {
  return (x + y) % 2 === 0 ? lightTileColor : darkTileColor;
};

const defaultColorConfig = {
  lastMove_from: "rgba(220,200,0,.3)",
  lastMove_to: "rgba(250,200,0,.3)",
  availableMove: "rgba(200,0,0,.5)",
  selected: "rgba(200,0,0,.5)",
  kingCheck: "rgba(255,0,0,.5)",
} as const;

export const getOverlayColor = (
  offset: number,
  chess: Chess,
  colorConfig = defaultColorConfig,
) => {
  let col = "";
  const lastMove = Arrays.last(chess.moveHistory);
  if (lastMove) {
    if (lastMove.from === offset) {
      col = colorConfig.lastMove_from;
    } else if (lastMove.to === offset) {
      col = colorConfig.lastMove_to;
    }
  }
  if (
    chess.selectedOffset >= 0 && chess.selectedOffset < Boards.BOARD_SIZE
  ) {
    const avMoves = chess.validMoves[chess.selectedOffset];
    for (const avMove of avMoves) {
      if (avMove.to === offset) {
        return colorConfig.availableMove;
      }
    }
  }
  if (
    offset === chess.selectedOffset
  ) {
    return colorConfig.selected;
  }
  if (offset === ChessState.getLastMove(chess)?.check) {
    return colorConfig.kingCheck;
  }
  return col;
};

export const getOverlayColorWithVec2 = (
  x: number,
  y: number,
  chess: Chess,
  colorConfig = defaultColorConfig,
) => {
  const offset = Coords.getOffset(x, y);
  return getOverlayColor(offset, chess, colorConfig);
};
