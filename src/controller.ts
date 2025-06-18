import { fromEvent, merge, animationFrameScheduler, interval } from 'rxjs';
import { map, scan, filter, withLatestFrom, startWith, switchAll, takeUntil, observeOn } from 'rxjs/operators';

export interface Focus {
  x: number;
  y: number;
}

interface Velocity {
  dx: number;
  dy: number;
}

export function createFocusStream(canvas: HTMLCanvasElement, invert: boolean) {
  const dragStart$ = fromEvent<MouseEvent>(canvas, 'mousedown');
  const dragMove$ = fromEvent<MouseEvent>(canvas, 'mousemove');
  const dragEnd$ = fromEvent<MouseEvent>(window, 'mouseup');

  const keyDown$ = fromEvent<KeyboardEvent>(window, 'keydown');
  const keyUp$ = fromEvent<KeyboardEvent>(window, 'keyup');

  const drag$ = dragStart$.pipe(
    map(start => {
      let prevX = start.clientX;
      let prevY = start.clientY;
      return dragMove$.pipe(
        map(move => {
          const dx = move.clientX - prevX;
          const dy = move.clientY - prevY;
          prevX = move.clientX;
          prevY = move.clientY;
          return { dx: (invert ? 1 : -1) * dx, dy: (invert ? 1 : -1) * dy };
        }),
        takeUntil(dragEnd$)
      );
    }),
    switchAll()
  );
  

  const keyState = new Set<string>();
  const keyboard$ = merge(
    keyDown$.pipe(map(e => ({ type: 'down', key: e.key }))), 
    keyUp$.pipe(map(e => ({ type: 'up', key: e.key })))
  ).pipe(
    scan((_, e) => {
      if (e.type === 'down') keyState.add(e.key);
      else keyState.delete(e.key);
      const dx = (keyState.has('a') || keyState.has('ArrowLeft') ? -1*50 : 0) +
                 (keyState.has('d') || keyState.has('ArrowRight') ? 1*50 : 0);
      const dy = (keyState.has('w') || keyState.has('ArrowUp') ? -1*50 : 0) +
                 (keyState.has('s') || keyState.has('ArrowDown') ? 1*50 : 0);
      return { dx, dy };
    }, { dx: 0, dy: 0 })
  );

  const input$ = merge(drag$, keyboard$);

  const tick$ = interval(0, animationFrameScheduler).pipe(
    map(() => performance.now()),
    scan((acc, current) => {
      const dt = (current - acc.prev) / 1000;
      return { dt, prev: current };
    }, { dt: 0, prev: performance.now() }),
    observeOn(animationFrameScheduler)
  );

  return tick$.pipe(
    withLatestFrom(input$.pipe(startWith({ dx: 0, dy: 0 }))),
    scan(({ focus, velocity }, [{ dt }, input]) => {
      const damping = 0.9;
      const accel = 100;
      const newVelocity = {
        dx: velocity.dx * damping + input.dx * accel * dt,
        dy: velocity.dy * damping + input.dy * accel * dt,
      };
      return {
        focus: {
          x: focus.x + newVelocity.dx * dt,
          y: focus.y + newVelocity.dy * dt,
        },
        velocity: newVelocity
      };
    }, {
      focus: { x: 0, y: 0 },
      velocity: { dx: 0, dy: 0 }
    }),
    map(state => state.focus)
  );
}
