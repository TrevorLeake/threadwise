// components/InfiniteGrid.tsx

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimation } from './hooks/useAnimation';

export type Coord = [number, number];
export type Grid<A> = { [key: string]: A };

export const key = ([x, y]: Coord) => `${x},${y}`;
export const parseKey = (k: string): Coord => k.split(',').map(Number) as Coord;



// REPRESENTATIONAL DESIGN NOTES
// could be segmented further... 
// hm... seeing... value and indicator are different sheaf like siblings... 
// one present or hidden by circumsatnce... another as that, but without "natural" in it

const playController = () => {
  const [offset, setOffset] = useState<Coord>([0, 0]);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      setOffset(([ox, oy]) => {
        switch (e.key.toLowerCase()) {
          case 'w': return [ox, oy - 1];
          case 's': return [ox, oy + 1];
          case 'a': return [ox - 1, oy];
          case 'd': return [ox + 1, oy];
          default: return [ox, oy];
        }
      });
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);
  return { offset, setOffset }
}



type InfiniteGridProps<A> = {
  grid: Grid<A>;
  renderCell: (
    val: A | undefined,
    coord: Coord,
    isCenter: boolean,
    indicator?: string
  ) => React.ReactNode;
  viewportWidth?: number;
  viewportHeight?: number;
};

const {offset, setOffset} = playController()

export const InfiniteGrid = <A,>({
  grid,
  renderCell,
  viewportWidth = 10,
  viewportHeight = 10,
}: InfiniteGridProps<A>) => {



  const [objCoord, setCoord] = useState<[number,number]>([-3,-5])
  const [time, setTime] = useState<number>(0)
  const [animating, setAnimating] = useState(true)
  const animationCallback = useCallback((t:number) => {
    // setTime(t)/
    const dx = offset[0] - objCoord[0]
    const signx = dx/Math.abs(dx)

    const dy = offset[1] - objCoord[1]
    const signy = dx/Math.abs(dy)

    const horizontallyCloser = Math.abs(dx) < Math.abs(dy) 
    setCoord(c => horizontallyCloser ? [c[0]+dx, c[1]] : [c[0], c[1]+dy])

  }, [objCoord])
  useAnimation(animating, animationCallback)
  
  const rows = [];
  const halfW = Math.floor(viewportWidth / 2);
  const halfH = Math.floor(viewportHeight / 2);

  const proximityRadius = 3;
  const indicators = new Map<string, string>(); // key(cell) => direction ('N', 'S', etc)
  
  for (const k in grid) {
    const [gx, gy] = parseKey(k);
    const dx = gx - offset[0];
    const dy = gy - offset[1];
  
    // Check if offscreen but near
    if (Math.abs(dx) > halfW || Math.abs(dy) > halfH) {
      if (Math.abs(dx) <= halfW + proximityRadius && Math.abs(dy) <= halfH + proximityRadius) {
        // Find the closest edge cell in viewport pointing toward this
        const clampedX = Math.max(-halfW, Math.min(halfW, dx));
        const clampedY = Math.max(-halfH, Math.min(halfH, dy));
        const indicatorCoord: Coord = [offset[0] + clampedX, offset[1] + clampedY];
        const dir =
          Math.abs(dx) > Math.abs(dy)
            ? dx > 0 ? '→' : '←'
            : dy > 0 ? '↓' : '↑';
  
        indicators.set(key(indicatorCoord), dir);
      }
    }
  }
  
  // start tracking player position

  // const [player, setPlayer] = useState<[number, number]([0,0])


  for (let y = -halfH; y <= halfH; y++) {
    const row = [];
    for (let x = -halfW; x <= halfW; x++) {
      const coord: Coord = [x + offset[0], y + offset[1]];
      const isCenter = x === 0 && y === 0;

      let indicator = indicators.get(key(coord));
      if(coord[0] === objCoord[0] && coord[1] === objCoord[1]) {
        indicator = `*${time.toFixed(0)}`
      }
      row.push(
        <td key={x}>
          {renderCell(grid[key(coord)], coord, isCenter, indicator)}
        </td>
      );
    }
    rows.push(<tr key={y}>{row}</tr>);
  }

  return (
    <div style={{ overflow: 'auto' }}>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};
