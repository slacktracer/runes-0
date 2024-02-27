import type { Point } from "./Point.js";

export const move = ({
  event,
  points,
  stylus,
}: {
  event: TouchEvent;
  points: Point[];
  stylus: {
    getBrushCoordinates: () => Point;
    update: (
      point: Point,
      options: { both: boolean; friction: number },
    ) => void;
  };
}) => {
  if (event.target instanceof HTMLCanvasElement) {
    const rect = event.target.getBoundingClientRect();

    const [{ clientX: x, clientY: y }] = event.changedTouches;

    stylus.update(
      { x: x - rect.left, y: y - rect.top },
      { both: true, friction: 0.1 },
    );

    // const hasMoved = stylus.brushHasMoved();

    // if (!hasMoved) {
    // return
    // }

    const { x: stylusX, y: stylusY } = stylus.getBrushCoordinates();

    points.push({ x: stylusX, y: stylusY });
  }
};
