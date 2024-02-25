import { json } from '@sveltejs/kit';

import { webSocketServer } from '../../lib/server/web-socket-server/web-socket-server.js';
import type { RequestHandler } from './$types';

export const GET = (async ({ url }) => {
	webSocketServer.clients.forEach((client) =>
		client.send(
			JSON.stringify({
				message: `This is the other hello from the GET handler at ${new Date().toLocaleString()}`
			})
		)
	);

	return json({
		success: true,
		message: 'Hello world from the GET handler',
		url
	});
}) satisfies RequestHandler;
