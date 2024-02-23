<script lang="ts">
	import { connectToWebSocket } from '../../lib/connect-to-web-socket.js';
	import { local } from '../../lib/local.js';

	const webSocket = connectToWebSocket();

	const increment = () =>
		webSocket?.send(JSON.stringify({ type: 'increment', data: {} }));
</script>

page here
<button on:click={increment}>Increment</button>

<h1>{$local.value}</h1>
