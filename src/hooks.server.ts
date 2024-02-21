import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { startWebsocketServer } from '$lib/server/websocket/start-websocket-server.js';
import { symbolForWebsocketServer } from '$lib/server/websocket/symbol-for-websocket-server.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

export const handle = (async ({ event, resolve }) => {
	startWebsocketServer();

	if (!building) {
		const websocketServer = (
			globalThis as typeof globalThis & {
				[symbolForWebsocketServer]: {
					emit: (
						eventName: string,
						webSocket: unknown,
						request: IncomingMessage
					) => void;
					handleUpgrade: (
						request: IncomingMessage,
						socket: Duplex,
						upgradeHead: Buffer,
						callback: (websocket: unknown) => void
					) => void;
				};
			}
		)[symbolForWebsocketServer];

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
