import { get } from "svelte/store";

import { tablet } from "./tablet-store.js";

export const move = (event: TouchEvent) => {
  const { isBeingCarved, stylus } = get(tablet);

  if (isBeingCarved && event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    stylus.update({ x: x - rect.left, y: y - rect.top }, { friction: 0.1 });

    const hasMoved = stylus.brushHasMoved();

    if (!hasMoved) {
      return;
    }

    const { x: stylusX, y: stylusY } = stylus.getBrushCoordinates();

    tablet.update((state) => {
      state.rune.push({ x: stylusX, y: stylusY });

      return state;
    });
  }
};
