import { symbolForWebSocketServer } from '../lib/server/web-socket/symbol-for-web-socket-server.js';
import type { WebSocketServerPlusSocketID } from './WebSocketServerPlusSocketID.js';

export type GlobalThisPlusWebSocketServer = typeof globalThis & {
	[symbolForWebSocketServer]: WebSocketServerPlusSocketID;
};
