import {Kysely, PostgresDialect, Insertable } from 'kysely';
import { Pool } from 'pg';



export interface Database {
	users: {
		id: number;
		username: string;
		email: string;
		password: string;
		verified: boolean;
		verification_code: string;
		created_at: string | Date;
	};
	profiles: {
		id: number;
		username: string;
		elo: number;
		games: number;
		wins: number;
		losses: number;
		rank: number;
		friends: number[]
	}
	notifications: {
		id: number;
		to_user: string;
		from_user: string;
		type: string;
		message: string;
		created_at: Date;
		seen: boolean;
	}
}

//export type InsertUser = Omit<Database['users'], 'id'>
export type InsertUser = Insertable<Database['users']>

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DATABASE_URL,
		}),
	}),
});

export default db;