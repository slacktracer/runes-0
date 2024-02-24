import { webSocketServer } from '../web-socket/web-socket-server.js';
import type { WebSocketPlusSocketID } from '../web-socket/types/WebSocketPlusSocketID.js';
import type { WebSocketServerHandlers } from '../web-socket/types/WebSockerServerHandlers.js';

let fiftyFirstGame = 0;

export const handlers = {
	increment: (data: unknown, socketID: string) => {
		fiftyFirstGame += 1;

		if (fiftyFirstGame === 50) {
			webSocketServer.clients.forEach((socket: WebSocketPlusSocketID) => {
				if (socket.socketID === socketID) {
					socket.send(JSON.stringify({ result: 'you won', won: true }));
				}
			});
		}

		webSocketServer.clients.forEach((socket) => {
			socket.send(JSON.stringify({ data }));
		});
	}
};

export const webSocketServerHandlers: WebSocketServerHandlers = {
	onMessage: (data: { type: keyof typeof handlers }, socketID: string) => {
		if (data && typeof data === 'object' && 'type' in data) {
			handlers[data.type](data, socketID);
		}
	}
};
