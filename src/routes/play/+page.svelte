<script lang="ts">
	import { connectToWebsocket } from '../../lib/connectToWebsocket.js';
	import {local} from "../../lib/useLocalStore.js"

	const websocket = connectToWebsocket();

	const increment = () => websocket?.send(JSON.stringify({ type: "increment", data: {}}))
</script>

page here
<button on:click={increment}>Increment</button>

<h1>{$local.value}</h1>