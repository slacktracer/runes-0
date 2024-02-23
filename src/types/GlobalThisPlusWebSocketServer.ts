import { symbolForWebsocketServer } from '../lib/server/websocket/symbol-for-websocket-server.js';
import type { WebSocketServerPlusSocketID } from './WebSocketServerPlusSocketID.js';

export type GlobalThisPlusWebSocketServer = typeof globalThis & {
	[symbolForWebsocketServer]: WebSocketServerPlusSocketID;
};
