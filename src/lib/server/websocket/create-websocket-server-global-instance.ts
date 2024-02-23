import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import { WebSocketServer } from 'ws';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketServerPlusSocketID } from '../../../types/WebSocketServerPlusSocketID.js';

export const createWebsocketServerGlobalInstance = () => {
	const webSocketServer = new WebSocketServer({ noServer: true });

	(globalThis as GlobalThisPlusWebSocketServer)[symbolForWebsocketServer] =
		webSocketServer as WebSocketServerPlusSocketID;

	return webSocketServer;
};
