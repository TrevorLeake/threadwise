// fog-of-war.ts

export type Coord = [number, number];
export type Tile = { type: 'grass' | 'wall' };
export type FogState = 'visible' | 'explored' | 'hidden';

// Utility to compute Manhattan distance
export const dist = ([x1, y1]: Coord, [x2, y2]: Coord) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

// Basic grid type
export type Grid<A> = Record<string, A>; // key is "x,y"

export const key = ([x, y]: Coord) => `${x},${y}`;
export const parseKey = (k: string): Coord => k.split(',').map(Number) as Coord;

export const makeGrid = <A>(cells: [Coord, A][]): Grid<A> => {
  const out: Grid<A> = {};
  for (const [coord, val] of cells) {
    out[key(coord)] = val;
  }
  return out;
};

export const getNeighbors = ([x, y]: Coord): Coord[] => [
  [x + 1, y],
  [x - 1, y],
  [x, y + 1],
  [x, y - 1]
];
