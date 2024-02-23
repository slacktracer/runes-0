import type { WebSocketServer } from 'ws';
import type { WebSocketPlusSocketID } from './WebSocketPlusSocketID.js';

export type WebSocketServerPlusSocketID = WebSocketServer & {
	clients: Set<WebSocketPlusSocketID>;
	on(arg0: string, arg1: (webSocket: WebSocketPlusSocketID) => void): unknown;
};
