import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { startWebSocketServer } from './lib/server/web-socket/start-web-socket-server.js';
import { symbolForWebSocketServer } from './lib/server/web-socket/symbol-for-web-socket-server.js';
import type { GlobalPlusWebSocketServer } from './lib/server/web-socket/types/GlobalPlusWebSocketServer.js';

export const handle = (async ({ event, resolve }) => {
	startWebSocketServer();

	if (!building) {
		const websocketServer = (global as GlobalPlusWebSocketServer)[
			symbolForWebSocketServer
		];

		if (websocketServer !== undefined) {
			// @ts-expect-error Got to find out how to extend event.locals type. But maybe I do not need it for this project.
			event.locals.websocketServer = websocketServer;
		}
	}

	const response = await resolve(event, {
		filterSerializedResponseHeaders: (name) => name === 'content-type'
	});

	return response;
}) satisfies Handle;
