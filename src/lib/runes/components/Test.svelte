<script lang="ts">
  import { connectToWebSocketServer } from "../connect-to-web-socket-server.js";

  const webSocket = connectToWebSocketServer();

  const increment = () =>
    webSocket?.send(JSON.stringify({ type: "increment", data: {} }));

  const reset = () =>
    webSocket?.send(JSON.stringify({ type: "reset", data: {} }));

  webSocket?.addEventListener("message", (message) => {
    if (typeof message.data === "string") {
      const data = JSON.parse(message.data);

      if (data?.won === true) {
        alert("you win");
      }

      if (data?.won === false) {
        alert("you lose");
      }
    }
  });
</script>

<br />

<button class="inc-button" on:click={increment}>Increment</button>

<h1>{"$local.value"}</h1>

<br />

<button on:click={reset}>Reset</button>

<style>
  .inc-button {
    font-size: 3rem;
  }
</style>
