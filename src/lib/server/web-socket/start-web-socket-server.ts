import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import { webSocketHandlers } from '../core/web-socket-server-handlers.js';
import { isWebsocketMessage } from './is-web-socket-message.js';
import { nanoid } from 'nanoid';
import type { GlobalThisPlusWebSocketServer } from './types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from './types/WebSocketPlusSocketID.js';

let websocketServerIsInitialised = false;

export const startWebSocketServer = () => {
	if (websocketServerIsInitialised) {
		return;
	}

	const websocketServer = (globalThis as GlobalThisPlusWebSocketServer)[
		symbolForWebSocketServer
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
				let rawDataAsString;

				if (rawData instanceof Buffer) {
					rawDataAsString = rawData.toString();
				}

				if (typeof rawDataAsString === 'string') {
					const data = JSON.parse(rawDataAsString);

					if (isWebsocketMessage(data)) {
						webSocketHandlers[data.type](data, webSocket.socketID);
					}
				}
			});
		});

		websocketServerIsInitialised = true;
	}
};
