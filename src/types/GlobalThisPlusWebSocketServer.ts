import { symbolForWebsocketServer } from '../lib/server/websocket/symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import type { WebSocketPlusSocketID } from './WebSocketPlusSocketID.js';
import type { WebSocketServer } from 'ws';

export type GlobalThisPlusWebSocketServer = typeof globalThis & {
	[symbolForWebsocketServer]: WebSocketServer & {
		clients: Set<WebSocketPlusSocketID>;
		on(arg0: string, arg1: (webSocket: WebSocketPlusSocketID) => void): unknown;
	};
};
