<script lang="ts">
  import { LazyBrush } from "lazy-brush";
  import { onMount } from "svelte";

  import { draw } from "./Tablet/draw.js";
  import type { Point } from "./Tablet/Point.js";

  let canvas: HTMLCanvasElement;

  let raf;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    const lazy = new LazyBrush({
      radius: 60,
      enabled: true,
      initialPoint: { x: 0, y: 0 },
    });

    const canvasOffsetX = canvas.offsetLeft;
    const canvasOffsetY = canvas.offsetTop;

    let startX;
    let startY;

    let isPainting = false;

    let lineWidth = 25;

    const context = canvas.getContext("2d");

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvasHeight = window.innerHeight * ratio;
    canvasWidth = window.innerWidth * ratio;

    const points: Point[] = [];

    if (context) {
      context.strokeStyle = "rgb(234, 88, 12)";

      context.lineWidth = lineWidth;

      context.lineCap = "round";

      const start = (event: TouchEvent) => {
        isPainting = true;

        [{ clientX: startX, clientY: startY }] = event.touches;

        context.moveTo(startX, startY);
      };

      const stop = () => {
        isPainting = false;

        draw(context, points);

        context.beginPath();
      };

      const move = (event: TouchEvent) => {
        if (!isPainting) {
          return;
        }

        let [{ clientX: x, clientY: y }] = event.changedTouches;

        lazy.update(
          { x: x - canvasOffsetX, y: y - canvasOffsetY },
          { both: true, friction: 0.1 },
        );

        const hasMoved = lazy.brushHasMoved();

        if (!hasMoved) {
          // return
        }

        const { x: lazyX, y: lazyY } = lazy.getBrushCoordinates();

        points.push({ x: lazyX, y: lazyY });
      };

      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", stop);
      canvas.addEventListener("touchmove", move);

      const loop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw(context, points);

        raf = requestAnimationFrame(loop);
      };

      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<div>
  <canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>
</div>

<style>
  canvas {
    touch-action: none;
  }
</style>
