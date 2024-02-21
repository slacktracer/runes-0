import { websocketHandlers } from '$lib/server/websocket/websocket-server-handlers.js';
import type { WebsocketMessage } from '../../../types/WebsocketMessage.js';

export const isWebsocketMessage = (
	argument: unknown
): argument is WebsocketMessage => {
	if (
		argument &&
		typeof argument === 'object' &&
		'type' in argument &&
		typeof argument.type === 'string' &&
		argument.type in websocketHandlers
	) {
		return true;
	}

	return false;
};
