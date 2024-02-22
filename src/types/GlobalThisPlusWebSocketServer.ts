import { symbolForWebsocketServer } from '../lib/server/websocket/symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import type { WebSocketPlusSocketID } from './WebSocketPlusSocketID.js';

export type GlobalThisPlusWebSocketServer = typeof globalThis & {
	[symbolForWebsocketServer]: {
		clients: Set<WebSocketPlusSocketID>;
		emit: (
			eventName: string,
			webSocket: unknown,
			request: IncomingMessage
		) => void;
		handleUpgrade: (
			request: IncomingMessage,
			socket: Duplex,
			upgradeHead: Buffer,
			callback: (websocket: WebSocketPlusSocketID) => void
		) => void;
		on(arg0: string, arg1: (webSocket: WebSocketPlusSocketID) => void): unknown;
	};
};
