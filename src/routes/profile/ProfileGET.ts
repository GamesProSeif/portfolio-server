import { Route } from 'acrus';
import { Request, Response } from 'express';
import MyServer from '../../structures/Server';
import Profile from '../../models/Profile';

export default class ProfileGET extends Route {
	public server!: MyServer;

	public constructor() {
		super('profileGET', {
			endpoint: '/profile/',
			type: 'GET'
		});
	}

	public async exec(req: Request, res: Response) {
		const profileRepo = this.server.db.getRepository(Profile);

		const profile = (await profileRepo.find({}))[0];

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!profile) {
			res.status(404).json({ error: 'no profile' });
			return;
		}

		res.json({ profile });
	}
}
