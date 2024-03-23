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
      state.counterRune.push({ x: stylusX, y: stylusY });

      return state;
    });
  }
};
