import './util/env';
import MyServer from './structures/Server';
import { EVENTS, TOPICS } from './util/constants';

const server = new MyServer();

server.on('ready', () => {
	server.logger.info(
		`Server running on port ${server.port}`,
		{ event: EVENTS.READY, topic: TOPICS.ACRUS }
	);
	server.logger.info(
		`Modules loaded: ${server.routeHandler.modules.size}`,
		{ event: EVENTS.READY, topic: TOPICS.ACRUS }
	);
});

void server.start();
