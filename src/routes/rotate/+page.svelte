<script>
  import { onMount } from "svelte";

  onMount(() => {
    console.log(0);
    const x = document.querySelector(".card");

    const b = document.querySelector("#go");

    b.addEventListener("click", () => {
      console.log("listen");
      if (x.classList.contains("r1")) {
        x.classList.add("rotate2");

        x.addEventListener(
          "animationend",
          () => {
            x.classList.remove("r1");
            x.classList.add("r2");

            // x.classList.add("kill");

            x.classList.remove("rotate1");
            x.classList.remove("rotate2");
            x.classList.remove("r2");

            // x.classList.remove("kill");
          },
          { once: true },
        );

        return;
      }

      x.classList.add("r1");
      x.classList.add("rotate1");

      x.addEventListener(
        "animationend",
        () => {
          x.classList.add("rotate1");
        },
        { once: true },
      );
    });
  });
</script>

<div class="r1 r2 rotate1 rotate2 kill"></div>

<div class="container">
  <div class="card"><span>S</span></div>
</div>

<button id="go">go</button>

<style>
  .container {
    display: grid;
    height: 90dvh;
    place-content: center;
  }

  .card {
    border: 1px solid crimson;
    color: crimson;
    display: grid;
    font-size: 4rem;
    height: 200px;
    place-content: center;
    transition: transform 1s;
    width: 100px;
  }

  .rotate1 {
    animation: rotate1 0.5s;
  }

  .rotate2 {
    animation: rotate2 0.5s;
  }

  .kill {
    animation: none;
  }

  .r1 {
    transform: rotateY(180deg);
  }
  .r2 {
    transform: rotateY(360deg);
  }

  @keyframes rotate1 {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(180deg);
    }
  }

  @keyframes rotate2 {
    from {
      transform: rotateY(180deg);
    }
    to {
      transform: rotateY(360deg);
    }
  }
</style>
