import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

type WeirdSpecialGlobalThis = typeof globalThis & {
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
};

export const websocketHandlers = {
	increment: (data: unknown, socketID: string) => {
		(globalThis as WeirdSpecialGlobalThis)[
			symbolForWebsocketServer
		].clients.forEach((socket) => {
			// if (socket.socketID !== socketID) {
			socket.send(JSON.stringify({ data }));
			// }
		});
	},

	test: (data: unknown, socketID: string) => {
		setTimeout(() => {
			(globalThis as WeirdSpecialGlobalThis)[
				symbolForWebsocketServer
			].clients.forEach((socket) => {
				if (socket.socketID !== socketID) {
					socket.send(JSON.stringify({ data }));
				}
			});
		}, 1000);
	}
};
