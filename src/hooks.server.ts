import type { Handle } from '@sveltejs/kit';
import { startWebSocketServer } from './lib/server/web-socket/start-web-socket-server.js';

export const handle = (async ({ event, resolve }) => {
	startWebSocketServer();

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});

	return response;
}) satisfies Handle;
