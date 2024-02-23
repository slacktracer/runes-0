import { webSocketHandlers } from '../lib/server/web-socket/web-socket-server-handlers.js';

export type WebSocketMessage = {
	data: unknown;
	type: keyof typeof webSocketHandlers;
};
