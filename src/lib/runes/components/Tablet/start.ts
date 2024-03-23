import { get } from "svelte/store";

import { local } from "../../local.js";

export const start = (event: TouchEvent) => {
  const tabletStore = get(local);

  const { runeFinished } = tabletStore;

  if (runeFinished) {
    return;
  }

  local.update((state) => {
    state.isBeingCarved = true;

    state.rune.length = 0;

    return state;
  });

  const { stylus } = tabletStore;

  const [{ clientX: x, clientY: y }] = event.changedTouches;

  stylus.update({ x, y }, { both: true });
};
