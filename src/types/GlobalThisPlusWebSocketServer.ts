import { symbolForWebsocketServer } from '../lib/server/websocket/symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import type { WebSocket } from 'ws';

export type GlobalThisPlusWebSocketServer = typeof globalThis & {
	[symbolForWebsocketServer]: {
		clients: Set<WebSocket & { socketID: string }>;
		emit: (
			eventName: string,
			webSocket: unknown,
			request: IncomingMessage
		) => void;
		handleUpgrade: (
			request: IncomingMessage,
			socket: Duplex,
			upgradeHead: Buffer,
			callback: (websocket: unknown) => void
		) => void;
		on(
			arg0: string,
			arg1: (webSocket: {
				send: (arg0: string) => void;
				on: (arg0: string, arg1: (data: string) => void) => void;
				socketID: string;
			}) => void
		): unknown;
	};
};
