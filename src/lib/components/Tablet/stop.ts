import { get } from "svelte/store";

import { tablet } from "./tablet-store.js";

export const stop = () => {
  tablet.update((state) => {
    state.isBeingCarved = false;

    return state;
  });

  const { stylus } = get(tablet);

  const { x, y } = stylus.getBrushCoordinates();

  stylus.update({ x, y }, { both: true });
};
