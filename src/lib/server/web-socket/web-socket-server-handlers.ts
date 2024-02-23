import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from '../../../types/WebSocketPlusSocketID.js';

export const webSocketHandlers = {
	increment: (data: unknown) => {
		(globalThis as GlobalThisPlusWebSocketServer)[
			symbolForWebSocketServer
		].clients.forEach((socket) => {
			socket.send(JSON.stringify({ data }));
		});
	},

	test: (data: unknown, socketID?: string) => {
		setTimeout(() => {
			(globalThis as GlobalThisPlusWebSocketServer)[
				symbolForWebSocketServer
			].clients.forEach((socket: WebSocketPlusSocketID) => {
				if (socket.socketID !== socketID) {
					socket.send(JSON.stringify({ data }));
				}
			});
		}, 1000);
	}
};
