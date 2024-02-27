import { getMidPoint } from "./get-mid-point.js";
import type { Point } from "./Point.js";

export const draw = (context: CanvasRenderingContext2D, points: Point[]) => {
  if (points.length < 2) {
    return;
  }

  context.strokeStyle = "rgb(234, 88, 12)";

  context.lineWidth = 25;

  context.lineCap = "round";

  let [pointA, pointB] = points;

  context.moveTo(pointB.x, pointB.y);

  context.beginPath();

  for (let i = 1, len = points.length; i < len; i++) {
    const midPoint = getMidPoint(pointA, pointB);

    context.quadraticCurveTo(pointA.x, pointA.y, midPoint.x, midPoint.y);

    pointA = points[i];

    pointB = points[i + 1];
  }

  context.lineTo(pointA.x, pointA.y);

  context.stroke();
};
