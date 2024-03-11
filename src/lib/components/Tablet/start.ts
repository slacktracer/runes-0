import { get } from "svelte/store";

import { tablet } from "./tablet-store.js";

export const start = (event: TouchEvent) => {
  const tabletStore = get(tablet);

  const { runeFinished } = tabletStore;

  if (runeFinished) {
    return;
  }

  tablet.update((state) => {
    state.isBeingCarved = true;

    state.rune.length = 0;

    return state;
  });

  const { stylus } = tabletStore;

  const [{ clientX: x, clientY: y }] = event.changedTouches;

  stylus.update({ x, y }, { both: true });
};
