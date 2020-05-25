import { Route } from 'acrus';
import { Request, Response } from 'express';

export default class MainGET extends Route {
	public constructor() {
		super('main', {
			endpoint: '/',
			type: 'GET'
		});
	}

	public exec(req: Request, res: Response) {
		res.json({ message: 'Welcome to the API' });
	}
}
