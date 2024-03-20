import { LazyBrush } from "lazy-brush";

export const makeStylus = ({ initialPoint = { x: 0, y: 0 } }) =>
  new LazyBrush({
    enabled: true,
    initialPoint,
    radius: 60,
  });
