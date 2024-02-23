let webSocketEstablished = false;
let websocket: WebSocket | null = null;
let running = false;

import { local } from './local.js';

export const connectToWebsocket = () => {
	if (typeof window === 'undefined') {
		return;
	}

	if (running) {
		return websocket;
	}

	running = true;

	if (webSocketEstablished) {
		return websocket;
	}

	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

	websocket = new WebSocket(`${protocol}//${window.location.host}/websocket`);

	websocket.addEventListener('open', (event) => {
		webSocketEstablished = true;

		console.log('[websocket] connection open', event);
	});

	websocket.addEventListener('close', (event) => {
		console.log('[websocket] connection closed', event);
	});

	websocket.addEventListener('message', (event) => {
		const parsed = JSON.parse(event?.data);
		console.log('[websocket] message received', parsed);

		if (parsed.data?.type === 'increment') {
			console.log(parsed);
			local.update((state) => {
				state.value += 1;

				console.log(state);

				return state;
			});
		}
	});

	return websocket;
};
