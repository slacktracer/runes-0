import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { onHttpServerUpgrade } from './lib/server/web-socket-server/on-http-server-upgrade.js';
import { createWebSocketServerGlobalInstance } from './lib/server/web-socket-server/create-web-socket-server-global-instance.js';

const directory = dirname(fileURLToPath(import.meta.url));

createWebSocketServerGlobalInstance();

const { server } = await import(resolve(directory, '../build/index.js'));

server.server.on('upgrade', onHttpServerUpgrade);

import './lib/server/core/web-socket-server-handlers.js';
