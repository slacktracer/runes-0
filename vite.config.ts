import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { createWebsocketServerGlobalInstance } from './src/lib/server/websocket/create-websocket-server-global-instance.js';
import { onHttpServerUpgrade } from './src/lib/server/websocket/on-http-server-upgrade.js';
// import { websocketServerVitePlugin } from '$lib/server/websocket/websocket-server-vite-plugin.js';

export default defineConfig({
	plugins: [
		sveltekit(),
		// websocketServerVitePlugin
		{
			name: 'integratedWebsocketServer',
			configureServer(server) {
				createWebsocketServerGlobalInstance();
				server.httpServer?.on('upgrade', onHttpServerUpgrade);
			},
			configurePreviewServer(server) {
				createWebsocketServerGlobalInstance();
				server.httpServer?.on('upgrade', onHttpServerUpgrade);
			}
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
