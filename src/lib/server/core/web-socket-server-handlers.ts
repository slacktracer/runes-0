import { webSocketServer } from '../web-socket/web-socket-server.js';
import type { WebSocketPlusSocketID } from '../web-socket/types/WebSocketPlusSocketID.js';

let fiftyFirstGame = 0;

export const webSocketHandlers: {
	[k: string]: (data: unknown, socketID: string) => void;
} = {
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
