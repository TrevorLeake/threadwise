// components/GridDisplay.tsx

import React from 'react';

export type Coord = [number, number];

export type Grid<A> = {
  [key: string]: A;
};

export function key([x, y]: Coord): string {
  return `${x},${y}`;
}

export function parseKey(k: string): Coord {
  const [x, y] = k.split(',').map(Number);
  return [x, y];
}

type GridDisplayProps<A> = {
  grid: Grid<A>;
  renderCell: (value: A, coord: Coord) => React.ReactNode;
};

export const GridDisplay = <A,>({ grid, renderCell }: GridDisplayProps<A>) => {
  const coords = Object.keys(grid).map(parseKey);
  const xs = coords.map(([x]) => x);
  const ys = coords.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const rows = [];
  for (let y = minY; y <= maxY; y++) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      const coord: Coord = [x, y];
      const cell = grid[key(coord)];
      row.push(
        <td key={x}>
          {cell !== undefined ? renderCell(cell, coord) : null}
        </td>
      );
    }
    rows.push(<tr key={y}>{row}</tr>);
  }

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
};
