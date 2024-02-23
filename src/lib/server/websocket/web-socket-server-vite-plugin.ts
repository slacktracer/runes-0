import { onHttpServerUpgrade } from './on-http-server-upgrade.js';
import { createWebsocketServerGlobalInstance } from './create-websocket-server-global-instance.js';
import type { PreviewServer, ViteDevServer } from 'vite';

export const webSocketServerVitePlugin = {
	configureServer(server: ViteDevServer) {
		createWebsocketServerGlobalInstance();
		server.httpServer?.on('upgrade', onHttpServerUpgrade);
	},
	configurePreviewServer(server: PreviewServer) {
		createWebsocketServerGlobalInstance();
		server.httpServer?.on('upgrade', onHttpServerUpgrade);
	},
	name: 'webSocketServer'
};
