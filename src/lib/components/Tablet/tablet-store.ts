import { writable } from "svelte/store";

import type { LazyBrush } from "../../types/LazyBrush.js";
import type { Point } from "../../types/Point.js";
import { makeStylus } from "./make-stylus.js";

type TabletState = {
  isBeingCarved: boolean;
  rune: Point[];
  runeColour: string;
  runeFinished: boolean;
  stylus: LazyBrush;
};

export const tablet = writable<TabletState>({
  isBeingCarved: false,
  rune: [],
  runeColour: "hsla(46, 100%, 50%, 1)",
  // runeColour: "hsla(355, 100%, 50%, 1)",
  runeFinished: false,
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
