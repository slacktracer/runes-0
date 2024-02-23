import { webSocketHandlers } from '../../core/web-socket-server-handlers.js';

export type WebSocketMessage = {
	data: unknown;
	type: keyof typeof webSocketHandlers;
};