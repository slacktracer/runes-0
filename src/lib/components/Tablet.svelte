<script lang="ts">
  import { onMount } from "svelte";

  import { draw } from "./Tablet/draw.js";
  import { makeStylus } from "./Tablet/make-stylus.js";
  import { move } from "./Tablet/move.js";
  import type { Point } from "./Tablet/Point.js";

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;

  let raf;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    let startX;
    let startY;

    let isPainting = false;

    let lineWidth = 25;

    const context = canvas.getContext("2d");

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvasHeight = container.clientHeight * ratio;
    canvasWidth = container.clientWidth * ratio;

    const points: Point[] = [];

    if (context) {
      context.strokeStyle = "rgb(234, 88, 12)";

      context.lineWidth = lineWidth;

      context.lineCap = "round";

      const start = (event: TouchEvent) => {
        isPainting = true;

        points.length = 0;

        [{ clientX: startX, clientY: startY }] = event.touches;

        context.moveTo(startX, startY);
      };

      const stop = () => {
        isPainting = false;

        draw(context, points);

        context.beginPath();
      };

      const stylus = makeStylus({ x: 0, y: 0 });

      const moveEventListener = (event: TouchEvent) => {
        if (isPainting) {
          move({ event, points, stylus });
        }
      };

      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", stop);
      canvas.addEventListener("touchmove", moveEventListener);

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

<div class="container" bind:this={container}>
  <canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>
</div>

<style>
  .container {
    border: 1px dashed dimgray;
    height: 75dvh;
  }

  canvas {
    touch-action: none;
  }
</style>
