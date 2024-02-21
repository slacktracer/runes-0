import { symbolForWebsocketServer } from '$lib/server/websocket/symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import { websocketHandlers } from '$lib/server/websocket/websocket-server-handlers.js';

let websocketServerIsInitialised = false;

export const startWebsocketServer = () => {
	if (websocketServerIsInitialised) {
		return;
	}

	const websocketServer = (
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
					upgradeHead: unknown,
					callback: (websocket: unknown) => void
				) => void;
				on(
					arg0: string,
					arg1: (webSocket: {
						send: (arg0: string) => void;
						on: (arg0: string, arg1: () => void) => void;
						socketID: string;
					}) => void
				): unknown;
			};
		}
	)[symbolForWebsocketServer];

	if (websocketServer !== undefined) {
		websocketServer.on(
			'connection',
			(webSocket: {
				send: (arg0: string) => void;
				on: (arg0: string, arg1: () => void) => void;
				socketID: string;
			}) => {
				// This is where you can authenticate the client from the request
				// const session = await getSessionFromCookie(request.headers.cookie || '');
				// if (!session) webSocket.close(1008, 'User not authenticated');
				// webSocket.userId = session.userId;

				console.log(
					`webSocketServer:global] client connected (${webSocket.socketID})`
				);

				webSocket.send(
					`Hello from SvelteKit ${new Date().toLocaleString()} (${webSocket.socketID})]`
				);

				webSocket.on('close', () => {
					console.log(
						`webSocketServer:global] client disconnected (${webSocket.socketID})`
					);
				});

				webSocket.on('message', (rawData) => {
					const data = JSON.parse(rawData);

					websocketHandlers[data.type](data, webSocket.socketID);
				});
			}
		);

		websocketServerIsInitialised = true;
	}
};
