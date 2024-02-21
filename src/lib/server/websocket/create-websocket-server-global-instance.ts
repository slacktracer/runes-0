import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import { WebSocketServer } from 'ws';
import { nanoid } from 'nanoid';
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

	webSocketServer.on(
		'connection',
		(webSocket: {
			socketID: string;
			on: (arg0: string, arg1: () => void) => void;
		}) => {
			webSocket.socketID = nanoid();

			console.log(
				`[webSocketServer:global] client connected (${webSocket.socketID})`
			);

			webSocket.on('close', () => {
				console.log(
					`[webSocketServer:global] client disconnected (${webSocket.socketID})`
				);
			});
		}
	);

	return webSocketServer;
};
