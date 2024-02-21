import { symbolForWebsocketServer } from '$lib/server/websocket/symbol-for-websocket-server.js';

export const websocketHandlers = {
	thing: (data: unknown, socketID: string) => {
		console.log('thing', data);

		setTimeout(() => {
			globalThis[symbolForWebsocketServer].clients.forEach((socket) => {
				if (socket.socketID === socketID) {
					socket.send('OK');
				}
			});
		}, 1000);
	}
};
