/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { Route } from 'acrus';
import { Request, Response } from 'express';
import MyServer from '../../structures/Server';
import Profile from '../../models/Profile';

export default class ProfilePUT extends Route {
	public server!: MyServer;

	public constructor() {
		super('profilePUT', {
			endpoint: '/profile',
			type: 'PUT'
		});
	}

	public async exec(req: Request, res: Response) {
		const profileRepo = this.server.db.getRepository(Profile);
		let profile = (await profileRepo.find({}))[0];

		const data: Partial<Profile> = req.body || {};

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!profile) {
			profile = new Profile();
		}

		profile.status = data.status || profile.status;
		profile.bio = data.bio || profile.bio;
		profile.picture = data.picture || profile.picture;
		profile.banner = data.banner || profile.banner;

		await profileRepo.save(profile);

		res.json({ profile });
	}
}
