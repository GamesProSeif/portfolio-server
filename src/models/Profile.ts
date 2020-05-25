import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export default class Profile {
	@ObjectIdColumn()
	public _id!: string;

	@Column()
	public status!: string;

	@Column()
	public bio!: string;

	@Column()
	public picture!: string;

	@Column()
	public banner!: string;
}
