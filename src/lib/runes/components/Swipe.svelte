<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();

  let swipe: HTMLDivElement;

  // let touchstartX = 0;
  // let touchstartY = 0;
  // let touchendX = 0;
  // let touchendY = 0;

  onMount(() => {
    if (swipe instanceof HTMLDivElement) {
      swipe.addEventListener(
        "touchstart",
        (/*event*/) => {
          // touchstartX = event.changedTouches[0].screenX;
          // touchstartY = event.changedTouches[0].screenY;
        },
        false,
      );

      swipe.addEventListener(
        "touchend",
        (/*event*/) => {
          // touchendX = event.changedTouches[0].screenX;
          // touchendY = event.changedTouches[0].screenY;

          handleGesture();
        },
        false,
      );
    }
  });

  function handleGesture() {
    dispatch("swipe");
  }
</script>

<div class="grid swipe" bind:this={swipe}><span>↔</span></div>

<style>
  .swipe {
    display: grid;
    font-size: 5rem;
    height: 100%;
    place-items: center;
    width: 100%;
  }
</style>
