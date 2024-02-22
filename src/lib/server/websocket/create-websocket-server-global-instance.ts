import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import { WebSocketServer } from 'ws';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

export const createWebsocketServerGlobalInstance = () => {
	const webSocketServer = new WebSocketServer({ noServer: true });

	(
		globalThis as typeof globalThis & {
			[symbolForWebsocketServer]: {
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
	)[symbolForWebsocketServer] = webSocketServer;

	return webSocketServer;
};
