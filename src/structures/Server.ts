import { Server, RouteHandler, Route } from 'acrus';
import { join } from 'path';
import { EVENTS, TOPICS } from '../util/constants';
import { generateLogger } from '../util/logger';

export default class MyServer extends Server {
	public routeHandler = new RouteHandler(this, {
		directory: join(__dirname, '..', 'routes/')
	});

	public logger = generateLogger({
		label: 'API',
		prefix: 'api',
		enableRotateFile: true
	});

	private _init() {
		this.routeHandler.on('load', (route: Route) => {
			this.logger.info(
				route.id,
				{ event: EVENTS.ROUTE_LOAD, topic: TOPICS.ACRUS }
			);
		});

		this.routeHandler.loadAll();
		this.routeHandler.init();
	}

	public start() {
		this._init();
		this.listen();
	}
}
