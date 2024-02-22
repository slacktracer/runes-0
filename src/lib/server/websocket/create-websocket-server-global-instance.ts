import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import { type WebSocket, WebSocketServer } from 'ws';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';

export const createWebsocketServerGlobalInstance = () => {
	const webSocketServer = new WebSocketServer({ noServer: true });

	(globalThis as GlobalThisPlusWebSocketServer)[symbolForWebsocketServer] =
		webSocketServer as WebSocketServer & {
			clients: Set<WebSocket & { socketID: string }>;
		};

	return webSocketServer;
};
