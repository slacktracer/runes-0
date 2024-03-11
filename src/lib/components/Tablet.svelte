<script lang="ts">
  import { onMount } from "svelte";

  import { draw } from "./Tablet/draw.js";
  import { move } from "./Tablet/move.js";
  import { start } from "./Tablet/start.js";
  import { stop } from "./Tablet/stop.js";
  import { tablet } from "./Tablet/tablet-store.js";

  let canvas: HTMLCanvasElement;
  let container: HTMLDivElement;

  let raf: number;

  let canvasHeight: number;
  let canvasWidth: number;

  onMount(() => {
    let lineWidth = 25;

    const context = canvas.getContext("2d");

    const ratio = 1; //Math.max(window.devicePixelRatio || 1, 1);

    canvasHeight = container.clientHeight * ratio;
    canvasWidth = container.clientWidth * ratio;

    if (context) {
      context.strokeStyle = $tablet.runeColour;

      context.lineWidth = lineWidth;

      context.lineCap = "round";

      canvas.addEventListener("touchstart", start);
      canvas.addEventListener("touchend", stop);
      canvas.addEventListener("touchmove", move);

      const loop = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        draw(context, $tablet.rune);

        raf = requestAnimationFrame(loop);
      };

      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
    };
  });
</script>

<div class="container grid" bind:this={container}>
  <canvas bind:this={canvas} height={canvasHeight} width={canvasWidth}></canvas>
</div>

<style>
  .container {
    height: 580px;
  }

  /*
  .checkerboard {
    --color: rgba(12, 155, 233, 0.05);
    --opacity: 0.05;
    --size: 120px;

    background-image: linear-gradient(
        45deg,
        var(--color) 25%,
        transparent 25%,
        transparent 75%,
        var(--color) 75%,
        var(--color)
      ),
      linear-gradient(
        45deg,
        var(--color) 25%,
        transparent 25%,
        transparent 75%,
        var(--color) 75%,
        var(--color)
      );
    background-position:
      0 0,
      calc(var(--size) / 2) calc(var(--size) / 2);
    background-size: var(--size) var(--size);
  }
*/

  .grid {
    --color: rgba(69, 78, 247, 0.2);
    --size: 40px;

    background-image: linear-gradient(var(--color) 1px, transparent 1px),
      linear-gradient(to right, var(--color) 1px, transparent 1px);
    background-position: center center;
    background-size: var(--size) var(--size);
  }

  canvas {
    touch-action: none;
  }
</style>
