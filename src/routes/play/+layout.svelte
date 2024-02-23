<script lang="ts">
	let log: string[] = [];

	const logEvent = (str: string) => {
		log = [...log, str];
	};

	const requestData = async () => {
		const response = await fetch('/test');
		const data = await response.json();

		logEvent(`[GET] data received: ${JSON.stringify(data)}`);
	};
</script>

<main>
	<h1>SvelteKit with WebSocket Integration</h1>

	<button on:click={() => requestData()}>
		Request Data from GET endpoint
	</button>

	<ul>
		{#each log as event}
			<li>{event}</li>
		{/each}
	</ul>
</main>

layout here
<slot />

<style>
	main {
		font-family: sans-serif;
	}
</style>
