import { ConnectionManager } from 'typeorm';
import { DEVELOPMENT } from '../util/constants';
import Profile from '../models/Profile';

const manager = new ConnectionManager();
const connection = manager.create({
	name: 'portfolio',
	type: 'mongodb',
	url: process.env.DB_URI,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	entities: [Profile],
	database: DEVELOPMENT ? 'dev' : 'prod'
});

export default connection;
