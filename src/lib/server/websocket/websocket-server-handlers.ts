import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

export const websocketHandlers = {
	test: (data: unknown, socketID: string) => {
		setTimeout(() => {
			(
				globalThis as typeof globalThis & {
					[symbolForWebsocketServer]: {
						clients: { send: (arg0: string) => void; socketID: string }[];
						emit: (
							eventName: string,
							webSocket: unknown,
							request: IncomingMessage
						) => void;
						handleUpgrade: (
							request: IncomingMessage,
							socket: Duplex,
							upgradeHead: Buffer,
							callback: (websocket: unknown) => void
						) => void;
					};
				}
			)[symbolForWebsocketServer].clients.forEach((socket) => {
				if (socket.socketID !== socketID) {
					socket.send(JSON.stringify({ data }));
				}
			});
		}, 1000);
	}
};
