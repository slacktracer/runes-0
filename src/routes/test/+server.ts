import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { webSocketServer } from '../../lib/server/web-socket/web-socket-server.js';

export const GET = (async ({ url, locals }) => {
	// @ts-expect-error Got to find out how to extend event.locals type. But maybe I do not need it for this project.
	if (locals.websocketServer) {
		// @ts-expect-error Got to find out how to extend event.locals type. But maybe I do not need it for this project.
		locals.websocketServer.clients.forEach(
			(client: { send: (arg0: string) => void; readyState: number }) => {
				if (client.readyState === 1) {
					client.send(
						JSON.stringify({
							message: `Hello from the GET handler at ${new Date().toLocaleString()}`
						})
					);
				}
			}
		);
		webSocketServer.clients.forEach((client) =>
			client.send(
				JSON.stringify({
					message: `This is the other Hello from the GET handler at ${new Date().toLocaleString()}`
				})
			)
		);
	}

	return json({ success: true, message: 'Hello world from GET handler', url });
}) satisfies RequestHandler;
