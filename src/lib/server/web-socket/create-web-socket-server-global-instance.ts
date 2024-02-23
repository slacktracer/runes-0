import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import { WebSocketServer } from 'ws';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketServerPlusSocketID } from '../../../types/WebSocketServerPlusSocketID.js';

export const createWebSocketServerGlobalInstance = () => {
	const webSocketServer = new WebSocketServer({ noServer: true });

	(globalThis as GlobalThisPlusWebSocketServer)[symbolForWebSocketServer] =
		webSocketServer as WebSocketServerPlusSocketID;

	return webSocketServer;
};
