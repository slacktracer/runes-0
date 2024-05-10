import { get } from "svelte/store";

import { local } from "../../local.js";

export const move = (event: TouchEvent) => {
  const { /*isBeingCarved, */ counterStylus } = get(local);

  if (/*isBeingCarved && */ event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    counterStylus.update(
      { x: x - rect.left, y: y - rect.top },
      { friction: 0.1 },
    );

    const hasMoved = counterStylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }

    const { x: stylusX, y: stylusY } = counterStylus.getBrushCoordinates();

    local.update((state) => {
      state.counterRune.unshift({ x: stylusX, y: stylusY });

      if (state.counterRune.length > 10) {
        state.counterRune.length = 10;
      }

      state.counterRune.forEach(({ x, y }) => {
        state.incomingRune.forEach((iRune) => {
          if (iRune.length) {
            const a = Math.hypot(x - iRune[0].x, y - iRune[0].y);

            if (a < 50) {
              iRune.splice(0, 1);
            }
          }

          if (iRune.length) {
            const b = Math.hypot(
              x - iRune[iRune.length - 1].x,
              y - iRune[iRune.length - 1].y,
            );

            if (b < 50) {
              iRune.splice(iRune.length - 1, 1);
            }
          }
        });
      });

      return state;
    });
  }
};
