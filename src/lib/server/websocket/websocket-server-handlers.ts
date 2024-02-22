import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';

export const websocketHandlers = {
	increment: (data: unknown) => {
		(globalThis as GlobalThisPlusWebSocketServer)[
			symbolForWebsocketServer
		].clients.forEach((socket) => {
			// if (socket.socketID !== socketID) {
			socket.send(JSON.stringify({ data }));
			// }
		});
	},

	test: (data: unknown, socketID: string) => {
		setTimeout(() => {
			(globalThis as GlobalThisPlusWebSocketServer)[
				symbolForWebsocketServer
			].clients.forEach((socket) => {
				if (socket.socketID !== socketID) {
					socket.send(JSON.stringify({ data }));
				}
			});
		}, 1000);
	}
};
