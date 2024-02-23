import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import { WebSocketServer } from 'ws';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from '../../../types/WebSocketPlusSocketID.js';

export const createWebsocketServerGlobalInstance = () => {
	const webSocketServer = new WebSocketServer({ noServer: true });

	(globalThis as GlobalThisPlusWebSocketServer)[symbolForWebsocketServer] =
		webSocketServer as WebSocketServer & {
			clients: Set<WebSocketPlusSocketID>;
		};

	return webSocketServer;
};
