<script lang="ts">
	import { connectToWebsocket } from '../../lib/connect-to-websocket.js';
	import {local} from "../../lib/local.js"

	const websocket = connectToWebsocket();

	const increment = () => websocket?.send(JSON.stringify({ type: "increment", data: {}}))
</script>

page here
<button on:click={increment}>Increment</button>

<h1>{$local.value}</h1>