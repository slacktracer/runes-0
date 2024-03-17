<script lang="ts">
  let aSide = true;
  let bSide = false;

  const turn = () => {
    aSide = !aSide;
    bSide = !bSide;
  };
</script>

<main>
  <div class="tabula">
    <div
      class:a-side-on={aSide}
      class:a-side-off={!aSide}
      class="a-side grid"
    ></div>
    <div
      class:b-side-on={bSide}
      class:b-side-off={!bSide}
      class="b-side grid"
    ></div>
  </div>
</main>

<div style="text-align: center">
  <button on:click={turn} style="font-size: 5rem">Switch</button>
</div>

<style>
  main {
    display: grid;
    height: 80dvh;
    margin-top: 2rem;
    place-items: center;
  }

  .tabula {
    --turn-speed: 150ms;

    height: 100%;
    perspective: 1000px;
    position: relative;
    transform-style: preserve-3d;
    width: 100%;
  }

  .tabula div {
    --default-animation-delay: calc(var(--turn-speed) + 50ms);
    --default-base-transform: rotate3d(0, 1, 0, 0deg);
    --default-transform: rotate3d(0, 1, 0, var(--off-degrees));
    --offset: 1rem;

    height: 75%;
    position: absolute;
    width: 80%;
  }

  .a-side {
    --color: rgba(0, 60, 255, 0.4);
    --off-degrees: 55deg;

    left: var(--offset);
    transform: var(--default-transform);
    transform-origin: left 0;
  }

  .a-side-on {
    animation: hinge-on var(--turn-speed) forwards;
    animation-delay: var(--default-animation-delay);
  }

  .a-side-off {
    animation: hinge-off var(--turn-speed) forwards;
  }

  .b-side {
    --color: hsla(134, 100%, 20%, 0.4);
    --off-degrees: -55deg;

    right: var(--offset);
    top: var(--offset);
    transform: var(--default-transform);
    transform-origin: right 0;
  }

  .b-side-on {
    animation: hinge-on var(--turn-speed) forwards;
    animation-delay: var(--default-animation-delay);
  }

  .b-side-off {
    animation: hinge-off var(--turn-speed) forwards;
  }

  .grid {
    --size: 40px;

    background-image: linear-gradient(var(--color) 1px, transparent 1px),
      linear-gradient(to right, var(--color) 1px, transparent 1px);
    background-position: center center;
    background-size: var(--size) var(--size);
  }

  @keyframes hinge-on {
    0% {
      transform: var(--default-transform);
    }
    100% {
      opacity: 1;
      transform: var(--default-base-transform);
    }
  }

  @keyframes hinge-off {
    0% {
      transform: var(--default-base-transform);
    }
    100% {
      opacity: 0.5;
      transform: var(--default-transform);
    }
  }
</style>
