<script lang="ts">
	import { onMount } from "svelte";

	import { connectToWebSocketServer } from "../../connect-to-web-socket-server.js";
	import { draw } from "./draw.js";
	import { move } from "./move.js";
	import { start } from "./start.js";
	import { stop } from "./stop.js";
	import { tablet } from "./tablet-store.js";

	connectToWebSocketServer();

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

				draw({ context, rune: $tablet.rune, runeColour: $tablet.runeColour });

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
        --color: rgba(0, 60, 255, 0.2);
        --size: 40px;

        background-image: linear-gradient(var(--color) 1px, transparent 1px),
        linear-gradient(to right, var(--color) 1px, transparent 1px);
        background-position: center center;
        background-size: var(--size) var(--size);
    }

    canvas {
        touch-action: none;
    }

    /*html {
			--s: 37px; !* control the size *!

			--c:#0000,#2FB8AC .5deg 119.5deg,#0000 120deg;
			--g1:conic-gradient(from  60deg at 56.25% calc(425%/6),var(--c));
			--g2:conic-gradient(from 180deg at 43.75% calc(425%/6),var(--c));
			--g3:conic-gradient(from -60deg at 50%   calc(175%/12),var(--c));
			background:
				var(--g1),var(--g1) var(--s) calc(1.73*var(--s)),
				var(--g2),var(--g2) var(--s) calc(1.73*var(--s)),
				var(--g3) var(--s) 0,var(--g3) 0 calc(1.73*var(--s))
				#ECBE13;
			background-size: calc(2*var(--s)) calc(3.46*var(--s));
		}*/
</style>
