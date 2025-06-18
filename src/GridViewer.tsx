import React, { useRef, useEffect, useState } from 'react';
import { createFocusStream, Focus } from './controller';
import { Subscription } from 'rxjs';

export default function RxInfiniteGridViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [focus, setFocus] = useState<Focus>({ x: 0, y: 0 });
  const [attractor, setAttractor] = useState<Focus>({ x: 10, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sub: Subscription = createFocusStream(canvas, true).subscribe(setFocus);
    return () => sub.unsubscribe();
  }, []);

  const workerRef = useRef<number>(null)
  useEffect(() => {
    const effectP = (timestamp:DOMHighResTimeStamp) => {
      const dist = Math.sqrt((focus.x - attractor.x)**2 + (focus.y - attractor.y)**2)
      console.log(timestamp.toFixed(2), dist)
      workerRef.current = requestAnimationFrame(effectP)
    }
    workerRef.current = requestAnimationFrame(effectP)
    return () => {
      cancelAnimationFrame(workerRef.current!)
    }
  })


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId: number;

    const draw = () => {
      const width = canvas.width = canvas.clientWidth;
      const height = canvas.height = canvas.clientHeight;
      const gridSize = 40;
      const startX = -((focus.x % gridSize) + gridSize) % gridSize;
      const startY = -((focus.y % gridSize) + gridSize) % gridSize;

      const cols = Math.ceil(width / gridSize) + 2;
      const rows = Math.ceil(height / gridSize) + 2;

      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = '#ccc';

      for (let i = 0; i < cols; i++) {
        const x = startX + i * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let j = 0; j < rows; j++) {
        const y = startY + j * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw focus indicator
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2);
      ctx.fill();

      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, [focus]);


  return <canvas ref={canvasRef} style={{ width: '100%', height: '100vh' }} />;
}