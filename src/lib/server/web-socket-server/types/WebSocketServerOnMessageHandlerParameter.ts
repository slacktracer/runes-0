import type { WebSocketPlusSocketID } from './WebSocketPlusSocketID.js';
import type { WebSocketServerPlusSocketID } from './WebSocketServerPlusSocketID.js';
import type { WebSocketMessage } from './WebSocketMessage.js';

export type WebSocketServerOnMessageHandlerParameter = {
	data: WebSocketMessage;
	webSocket: WebSocketPlusSocketID;
	webSocketServer: WebSocketServerPlusSocketID;
};
