import { websocketHandlers } from '../lib/server/websocket/websocket-server-handlers.js';

export type WebsocketMessage = {
	data: unknown;
	type: keyof typeof websocketHandlers;
};
