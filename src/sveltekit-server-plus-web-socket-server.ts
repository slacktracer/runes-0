import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { onHttpServerUpgrade } from './lib/server/web-socket-server/on-http-server-upgrade.js';
import { createWebSocketServerGlobalInstance } from './lib/server/web-socket-server/create-web-socket-server-global-instance.js';

createWebSocketServerGlobalInstance();

const directory = dirname(fileURLToPath(import.meta.url));

const { server } = await import(resolve(directory, '../build/index.js'));

server.server.on('upgrade', onHttpServerUpgrade);
