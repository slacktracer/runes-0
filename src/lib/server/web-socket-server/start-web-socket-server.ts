import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import { nanoid } from 'nanoid';
import type { GlobalPlusWebSocketServer } from './types/GlobalPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from './types/WebSocketPlusSocketID.js';
import type { WebSocketServerHandlers } from './types/WebSockerServerHandlers.js';

let websocketServerIsInitialised = false;

export const startWebSocketServer = ({
	handlers
}: {
	handlers: WebSocketServerHandlers;
}) => {
	if (websocketServerIsInitialised) {
		return;
	}

	const webSocketServer = (global as GlobalPlusWebSocketServer)[
		symbolForWebSocketServer
	];

	if (webSocketServer !== undefined) {
		webSocketServer.on('connection', (webSocket: WebSocketPlusSocketID) => {
			webSocket.socketID = nanoid();

			console.log(`[webSocketServer] client connected (${webSocket.socketID})`);

			webSocket.send(
				JSON.stringify({
					socketID: webSocket.socketID,
					now: new Date().toISOString()
				})
			);

			webSocket.on('close', () => {
				console.log(
					`[webSocketServer] client disconnected (${webSocket.socketID})`
				);
			});

			webSocket.on('message', (rawData) => {
				handlers.onMessage({ rawData, webSocket, webSocketServer });
			});
		});

		websocketServerIsInitialised = true;
	}
};