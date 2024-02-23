import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import type { GlobalThisPlusWebSocketServer } from './types/GlobalThisPlusWebSocketServer.js';

export const webSocketServer = (globalThis as GlobalThisPlusWebSocketServer)[
	symbolForWebSocketServer
];
