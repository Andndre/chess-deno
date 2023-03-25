import { Vec2 } from "../mod.ts";

// export namespace Coords {
export function getOffset(x: number, y: number) {
  return y * 8 + x;
}
export function getCoords(index: number): Vec2 {
  const x = index % 8;
  const y = Math.floor(index / 8);
  return {
    x,
    y,
  };
}
export function addCoords(first: Vec2, second: Vec2) {
  first.x += second.x;
  first.y += second.y;
  return first;
}
// }
