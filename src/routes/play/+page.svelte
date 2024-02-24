<script lang="ts">
	import { connectToWebSocket } from '../../lib/connect-to-web-socket.js';
	import { local } from '../../lib/local.js';

	const webSocket = connectToWebSocket();

	const increment = () =>
		webSocket?.send(JSON.stringify({ type: 'increment', data: {} }));

	webSocket?.addEventListener("message", (message) => {
		if (typeof message.data === 'string') {
			const data = JSON.parse(message.data);

			if (data?.won === true) {
				alert("you win");
			}

			if (data?.won === false) {
				alert("you lose");
			}
		}
	})
</script>

page here
<button on:click={increment}>Increment</button>

<h1>{$local.value}</h1>
