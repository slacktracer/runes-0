<div class="slice-container">
  <div class="slice">
    <div class="side front">
      <div class="face-background front-face-background"></div>
    </div>
    <div class="side left"></div>
    <div class="side top"></div>
    <div class="blur"></div>
    <div class="side bottom"></div>
    <div class="side right"></div>
    <div class="side back">
      <div class="face-background back-face-background"></div>
    </div>
  </div>
</div>

<style>
  .slice-container {
    align-items: center;
    border: 1px solid #333333;
    display: flex;
    height: 400px;
    justify-content: center;
    margin: 1rem 0.5rem auto 0.5rem;
    perspective: 300px;
  }

  .slice {
    --slice-height: 600px;
    --slice-thickness: 25px;
    --slice-width: 320px;

    animation: rotate 1.5s linear;
    animation-delay: 1s;
    display: flex;
    height: var(--slice-height);
    position: relative;
    top: 8rem;
    transform-style: preserve-3d;
    width: var(--slice-width);
  }

  .side {
    border: 1px solid #333333;
    display: flex;
    height: 100%;
    opacity: 0.6;
    position: absolute;
    transform-style: preserve-3d;
    width: 100%;
  }

  :is(.front, .back, .left, .right) {
    height: var(--slice-height);
  }

  .front {
    transform: translateZ(calc(var(--slice-thickness) / 2));
  }

  .face-background {
    background-color: hsla(0, 0%, 0%, 0.1);
    height: 100%;
    mask-position: center center;
    mask-repeat: no-repeat;
    width: 100%;
  }

  .front-face-background {
    mask-image: url("/noun-sword-6838835.svg");
  }

  .blur {
    backdrop-filter: blur(4px);
    position: absolute;
    inset: 8px 6px 17px 7px;
  }

  .back {
    transform: translateZ(calc(var(--slice-thickness) / -2));
  }

  .back-face-background {
    mask-image: url("/noun-epic-sword-6838844.svg");
  }

  .left {
    backdrop-filter: blur(16px);
    background: hsla(0, 0%, 90%, 0.2);
    border: none;
    transform: rotateY(-90deg) translateZ(calc(var(--slice-thickness) / 2));
    width: var(--slice-thickness);
  }

  .right {
    backdrop-filter: blur(16px);
    background: hsla(0, 0%, 90%, 0.2);
    border: none;
    transform: rotateY(90deg)
      translateZ(calc(var(--slice-width) + (var(--slice-thickness) / -2)));
    width: var(--slice-thickness);
  }

  .top {
    backdrop-filter: blur(16px);
    background: hsla(0, 0%, 90%, 0.2);
    border: none;
    border-inline-end: 1px solid darkgray;
    border-inline-start: 1px solid darkgray;
    height: var(--slice-thickness);
    transform: rotateX(90deg) translateZ(calc(var(--slice-thickness) / 2));
  }

  .bottom {
    backdrop-filter: blur(16px);
    background: hsla(0, 0%, 90%, 0.2);
    border: none;
    border-inline-end: 1px solid darkgray;
    border-inline-start: 1px solid darkgray;
    height: var(--slice-thickness);
    transform: rotateX(-90deg)
      translateZ(calc(var(--slice-height) + (var(--slice-thickness) / -2)));
  }

  @keyframes rotate {
    from {
      transform: rotateY(0) rotateX(0deg) rotateZ(0deg);
    }
    to {
      transform: rotateY(360deg) rotateX(0deg) rotateZ(0deg);
    }
  }
</style>
