import { parse } from 'url';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import { symbolForWebSocketServer } from './symbol-for-web-socket-server.js';
import type { GlobalThisPlusWebSocketServer } from './types/GlobalThisPlusWebSocketServer.js';
import type { WebSocketPlusSocketID } from './types/WebSocketPlusSocketID.js';

export const onHttpServerUpgrade = (
	request: IncomingMessage,
	socket: Duplex,
	upgradeHead: Buffer
) => {
	const pathname = request.url ? parse(request.url).pathname : null;

	if (pathname !== '/connect') {
		return;
	}

	const webSocketServer = (globalThis as GlobalThisPlusWebSocketServer)[
		symbolForWebSocketServer
	];

	webSocketServer.handleUpgrade(
		request,
		socket,
		upgradeHead,
		(webSocket: WebSocketPlusSocketID) => {
			webSocketServer.emit('connection', webSocket, request);
		}
	);
};
