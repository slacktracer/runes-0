import type { handlers } from '../../core/web-socket-server-handlers.js';

export type WebSocketServerHandlers = {
	onMessage: (data: { type: keyof typeof handlers }, socketID: string) => void;
};
