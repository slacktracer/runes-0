<script lang="ts">
  let step = 0;

  let go = () => {
    if (step === 0) {
      transitionable = true;
    }

    step = (step + 1) % 3;
  };

  let transitionable = true;

  let end = () => {
    if (step === 2) {
      transitionable = false;
      step = 0;
    }
  };
</script>

<div class="slice-container">
  <div
    class:step-1={step === 1}
    class:step-2={step === 2}
    class:transitionable
    class="slice"
    on:transitionend={end}
  >
    <div class="side front">
      <button class="go" on:click={go}></button>
    </div>
    <div class="side left"></div>
    <div class="side top"></div>
    <div class="side bottom"></div>
    <div class="side right"></div>
    <div class="side back">
      <button class="go" on:click={go}></button>
    </div>
  </div>
</div>

<style>
  .slice-container {
    align-items: center;
    display: flex;
    height: 400px;
    justify-content: center;
    margin: 1rem 0.5rem auto 0.5rem;
    perspective: 310px;
  }

  .slice {
    --slice-height: 600px;
    --slice-thickness: 50px;
    --slice-width: 320px;

    display: flex;
    height: var(--slice-height);
    position: relative;
    top: 8rem;
    transform-style: preserve-3d;
    width: var(--slice-width);
  }

  .side {
    backdrop-filter: blur(1px);
    background-color: hsla(360, 100%, 100%, 0.5);
    display: flex;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  :is(.front, .back, .left, .right) {
    height: var(--slice-height);
  }

  .front {
    outline: 1px solid #aaaaaa;
    transform: translateZ(calc(var(--slice-thickness) / 2));
  }

  .front::before {
    background-color: hsla(348, 83%, 50%, 0.1);
    content: "";
    height: 100%;
    mask-image: url("/noun-sword-6838835.svg");
    mask-position: center center;
    mask-repeat: no-repeat;
    width: 100%;
  }

  .back {
    outline: 1px solid #aaaaaa;
    transform: rotateY(180deg) translateZ(calc(var(--slice-thickness) / 2));
  }

  .back::before {
    background-color: hsla(348, 83%, 50%, 0.1);
    content: "";
    height: 100%;
    mask-image: url("/noun-epic-sword-6838844.svg");
    mask-position: center center;
    mask-repeat: no-repeat;
    width: 100%;
  }

  .left {
    transform: rotateY(-90deg) translateZ(calc(var(--slice-thickness) / 2));
    width: var(--slice-thickness);
  }

  .right {
    transform: rotateY(90deg)
      translateZ(calc(var(--slice-width) + (var(--slice-thickness) / -2)));
    width: var(--slice-thickness);
  }

  .top {
    height: var(--slice-thickness);
    transform: rotateX(90deg) translateZ(calc(var(--slice-thickness) / 2));
  }

  .bottom {
    height: var(--slice-thickness);
    transform: rotateX(-90deg)
      translateZ(calc(var(--slice-height) + (var(--slice-thickness) / -2)));
  }

  .transitionable {
    transition: transform 0.5s;
  }

  .step-1 {
    transform: rotateY(180deg);
  }

  .step-2 {
    transform: rotateY(360deg);
  }

  .go {
    all: unset;
    background: linear-gradient(
      to bottom right,
      transparent 0%,
      transparent 50%,
      hsla(0, 0%, 67%, 0.1) 50%,
      hsla(0, 0%, 67%, 0.1) 100%
    );
    bottom: 0;
    height: 30px;
    position: absolute;
    right: 0;
    width: 30px;
  }

  /*.go-left {
    all: unset;
    background: linear-gradient(
      to bottom left,
      transparent 0%,
      transparent 50%,
      hsla(0, 0%, 67%, 0.1) 50%,
      hsla(0, 0%, 67%, 0.1) 100%
    );
    bottom: 0;
    height: 30px;
    left: 0;
    position: absolute;
    width: 30px;
  }*/
</style>
