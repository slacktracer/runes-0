import { parse } from 'url';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import { symbolForWebsocketServer } from './symbol-for-websocket-server.js';
import type { GlobalThisPlusWebSocketServer } from '../../../types/GlobalThisPlusWebSocketServer.js';

export const onHttpServerUpgrade = (
	request: IncomingMessage,
	socket: Duplex,
	upgradeHead: Buffer
) => {
	const pathname = request.url ? parse(request.url).pathname : null;

	if (pathname !== '/websocket') {
		return;
	}

	const webSocketServer = (globalThis as GlobalThisPlusWebSocketServer)[
		symbolForWebsocketServer
	];

	webSocketServer.handleUpgrade(
		request,
		socket,
		upgradeHead,
		(webSocket: unknown) => {
			webSocketServer.emit('connection', webSocket, request);
		}
	);
};
