let webSocketEstablished = false;
let webSocket: WebSocket | null = null;
let running = false;

import { local } from './local.js';

export const connectToWebSocket = () => {
	if (typeof window === 'undefined') {
		return;
	}

	if (running) {
		return webSocket;
	}

	running = true;

	if (webSocketEstablished) {
		return webSocket;
	}

	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

	webSocket = new WebSocket(`${protocol}//${window.location.host}/connect`);

	webSocket.addEventListener('open', (event) => {
		webSocketEstablished = true;

		console.log('[webSocket] connection open', event);
	});

	webSocket.addEventListener('close', (event) => {
		console.log('[webSocket] connection closed', event);
	});

	webSocket.addEventListener('message', (event) => {
		const parsed = JSON.parse(event?.data);
		console.log('[webSocket] message received', parsed);

		if (parsed.data?.type === 'increment') {
			local.update((state) => {
				state.value += 1;

				return state;
			});
		}
	});

	return webSocket;
};
