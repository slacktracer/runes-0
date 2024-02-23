import { webSocketServer } from '../web-socket/web-socket-server.js';

export const webSocketHandlers: {
	[k: string]: (data: unknown, socketID?: string) => void;
} = {
	increment: (data: unknown) => {
		webSocketServer.clients.forEach((socket) => {
			socket.send(JSON.stringify({ data }));
		});
	}
};
