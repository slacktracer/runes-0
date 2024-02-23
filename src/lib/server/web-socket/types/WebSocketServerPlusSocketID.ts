import type { WebSocketServer } from 'ws';
import type { WebSocketPlusSocketID } from './WebSocketPlusSocketID.js';

export type WebSocketServerPlusSocketID = WebSocketServer & {
	clients: Set<WebSocketPlusSocketID>;
	on(
		eventName: string,
		callback: (webSocket: WebSocketPlusSocketID) => void
	): unknown;
};
