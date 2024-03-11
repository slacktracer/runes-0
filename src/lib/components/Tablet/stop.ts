import { get } from "svelte/store";

import { launch } from "./launch.js";
import { tablet } from "./tablet-store.js";

export const stop = () => {
  const tabletStore = get(tablet);

  const { runeFinished } = tabletStore;

  if (runeFinished) {
    const { rune } = tabletStore;

    launch({ rune });

    tablet.update((state) => {
      state.runeFinished = false;

      return state;
    });

    return;
  }

  tablet.update((state) => {
    state.isBeingCarved = false;

    state.runeFinished = true;

    return state;
  });

  const { stylus } = tabletStore;

  const { x, y } = stylus.getBrushCoordinates();

  stylus.update({ x, y }, { both: true });
};
