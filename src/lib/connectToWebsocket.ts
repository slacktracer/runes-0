let webSocketEstablished = false;
let websocket: WebSocket | null = null;

export const connectToWebsocket = () => {
	if (typeof window === 'undefined') {
		return;
	}

	if (webSocketEstablished) {
		return;
	}

	const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

	websocket = new WebSocket(`${protocol}//${window.location.host}/websocket`);

	websocket.addEventListener('open', (event) => {
		webSocketEstablished = true;

		console.log('[websocket] connection open', event);

		// logEvent('[websocket] connection open');
	});

	websocket.addEventListener('close', (event) => {
		console.log('[websocket] connection closed', event);

		// logEvent('[websocket] connection closed');
	});

	websocket.addEventListener('message', (event) => {
		console.log('[websocket] message received', event);

		// logEvent(`[websocket] message received: ${event.data}`);
	});
};
