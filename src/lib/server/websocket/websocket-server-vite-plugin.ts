import { onHttpServerUpgrade } from './on-http-server-upgrade.js';
import { createWebsocketServerGlobalInstance } from './create-websocket-server-global-instance.js';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';

export const websocketServerVitePlugin = {
	configurePreviewServer(server: {
		httpServer: {
			on: (
				arg0: string,
				arg1: (
					request: IncomingMessage,
					socket: Duplex,
					upgradeHead: Buffer
				) => void
			) => void;
		};
	}) {
		createWebsocketServerGlobalInstance();
		server.httpServer?.on('upgrade', onHttpServerUpgrade);
	},

	configureServer(server: {
		httpServer: {
			on: (
				arg0: string,
				arg1: (
					request: IncomingMessage,
					socket: Duplex,
					upgradeHead: Buffer
				) => void
			) => void;
		};
	}) {
		createWebsocketServerGlobalInstance();
		server.httpServer?.on('upgrade', onHttpServerUpgrade);
	},

	name: 'websocketServer'
};
