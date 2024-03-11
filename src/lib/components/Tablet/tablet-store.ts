import { writable } from "svelte/store";

import type { LazyBrush } from "../../types/LazyBrush.js";
import type { Point } from "../../types/Point.js";
import { makeStylus } from "./make-stylus.js";

type TabletState = {
  isBeingCarved: boolean;
  rune: Point[];
  runeColour: string;
  stylus: LazyBrush;
};

export const tablet = writable<TabletState>({
  isBeingCarved: false,
  rune: [],
  runeColour: "rgb(234, 88, 12)",
  stylus: makeStylus({ initialPoint: { x: 0, y: 0 } }),
});
