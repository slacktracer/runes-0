import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import { websocketHandlers } from './websocket-server-handlers.js';
import { isWebsocketMessage } from './is-web-socket-message.js';
import { nanoid } from 'nanoid';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from '../../../types/WebSocketPlusSocketID.js';

let websocketServerIsInitialised = false;

export const startWebsocketServer = () => {
	if (websocketServerIsInitialised) {
		return;
	}

	const websocketServer = (globalThis as GlobalThisPlusWebSocketServer)[
		symbolForWebsocketServer
	];

	if (websocketServer !== undefined) {
		websocketServer.on('connection', (webSocket: WebSocketPlusSocketID) => {
			webSocket.socketID = nanoid();

			console.log(
				`[webSocketServer:global] client connected (${webSocket.socketID})`
			);

			webSocket.send(
				JSON.stringify({
					socketID: webSocket.socketID,
					now: new Date().toISOString()
				})
			);

			webSocket.on('close', () => {
				console.log(
					`[webSocketServer:global] client disconnected (${webSocket.socketID})`
				);
			});

			webSocket.on('message', (rawData) => {
				if (typeof rawData === 'string') {
					const data = JSON.parse(rawData);

					if (isWebsocketMessage(data)) {
						websocketHandlers[data.type](data, webSocket.socketID);
					}
				}
			});
		});

		websocketServerIsInitialised = true;
	}
};
