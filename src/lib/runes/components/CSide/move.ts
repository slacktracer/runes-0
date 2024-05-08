import { get } from "svelte/store";

import { local } from "../../local.js";
import { example } from "./example.js";

export const move = (event: TouchEvent) => {
  const { /*isBeingCarved, */ counterStylus } = get(local);

  if (/*isBeingCarved && */ event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    // example.forEach((point, index) => {
    //   const a = Math.hypot(x - point.x, y - point.y);
    //   if (a < 100) {
    //     example.splice(index, 1);
    //   }
    // });

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
      state.counterRune.push({ x: stylusX, y: stylusY });

      state.counterRune.forEach(({ x, y }) => {
        const a = Math.hypot(x - example[0].x, y - example[0].y);

        if (a < 50) {
          example.splice(0, 1);
        }

        // console.log(a);

        const b = Math.hypot(
          x - example[example.length - 1].x,
          y - example[example.length - 1].y,
        );

        if (b < 50) {
          example.splice(example.length - 1, 1);
        }
      });

      return state;
    });
  }
};
