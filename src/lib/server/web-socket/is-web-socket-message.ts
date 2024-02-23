import { webSocketHandlers } from '../core/web-socket-server-handlers.js';
import type { WebSocketMessage } from './types/WebSocketMessage.js';

export const isWebsocketMessage = (
	argument: unknown
): argument is WebSocketMessage => {
	if (
		argument &&
		typeof argument === 'object' &&
		'type' in argument &&
		typeof argument.type === 'string' &&
		argument.type in webSocketHandlers
	) {
		return true;
	}

	return false;
};
