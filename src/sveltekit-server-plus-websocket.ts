import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { onHttpServerUpgrade } from './lib/server/websocket/on-http-server-upgrade.js';
import { createWebsocketServerGlobalInstance } from './lib/server/websocket/create-websocket-server-global-instance.js';

const directory = dirname(fileURLToPath(import.meta.url));

createWebsocketServerGlobalInstance();

const { server } = await import(resolve(directory, '../build/index.js'));

server.server.on('upgrade', onHttpServerUpgrade);

import './lib/server/websocket/websocket-server-handlers.js';
