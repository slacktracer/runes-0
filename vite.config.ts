import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { webSocketServerVitePlugin } from './src/lib/server/websocket/web-socket-server-vite-plugin.js';

export default defineConfig({
	plugins: [sveltekit(), webSocketServerVitePlugin],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
