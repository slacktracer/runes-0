import { get } from "svelte/store";

import { local } from "../../local.js";
// import { launch } from "./launch.js";

export const stop = () => {
  const localStore = get(local);

  const { runeFinished } = localStore;

  if (runeFinished) {
    const { counterRune } = localStore;

    // launch({ rune })
    console.log(counterRune);

    local.update((state) => {
      state.runeFinished = false;

      return state;
    });

    return;
  }

  local.update((state) => {
    state.isBeingCarved = false;

    state.runeFinished = true;

    return state;
  });

  const { stylus } = localStore;

  const { x, y } = stylus.getBrushCoordinates();

  stylus.update({ x, y }, { both: true });
};
