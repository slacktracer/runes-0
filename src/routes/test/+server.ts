import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { webSocketServer } from '../../lib/server/web-socket-server/web-socket-server.js';

export const GET = (async ({ url }) => {
	webSocketServer.clients.forEach((client) =>
		client.send(
			JSON.stringify({
				message: `This is the other Hello from the GET handler at ${new Date().toLocaleString()}`
			})
		)
	);

	return json({ success: true, message: 'Hello world from GET handler', url });
}) satisfies RequestHandler;
