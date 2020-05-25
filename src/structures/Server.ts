import { Server, RouteHandler, Route } from 'acrus';
import { join } from 'path';
import { Connection } from 'typeorm';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import connection from './Database';
import { EVENTS, TOPICS } from '../util/constants';
import { generateLogger } from '../util/logger';

export default class MyServer extends Server {
	public db!: Connection;

	public routeHandler = new RouteHandler(this, {
		directory: join(__dirname, '..', 'routes/')
	});

	public logger = generateLogger({
		label: 'API',
		prefix: 'api',
		enableRotateFile: true
	});

	private async _init() {
		this.db = connection;
		await this.db.connect();
		this.logger.info('Connected to database',
			{ event: EVENTS.CONNECT_DB, topic: TOPICS.TYPEORM });

		this.app.use(json());
		this.app.use(urlencoded({ extended: false }));

		this.app.use(
			morgan(
				':method :url :status :remote-addr :response-time[3] :referrer',
				{
					stream: {
						write: (str: string) => this.logger.debug(str.replace('\n', ''), {
							topic: TOPICS.EXPRESS,
							event: EVENTS.ROUTE_HIT
						})
					}
				}
			)
		);

		this.routeHandler.on('load', (route: Route) => {
			this.logger.info(
				route.id,
				{ event: EVENTS.ROUTE_LOAD, topic: TOPICS.ACRUS }
			);
		});

		this.routeHandler.on('routeError', (err: any) => {
			this.logger.error(err, { event: EVENTS.ROUTE_ERROR, topic: TOPICS.ACRUS });
		});

		this.routeHandler.loadAll();
		this.routeHandler.init();
	}

	public async start() {
		await this._init();
		this.listen();
	}
}
