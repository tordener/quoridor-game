import {Kysely, PostgresDialect, Insertable } from 'kysely';
import { Pool } from 'pg';



export interface Database {
	users: {
		id: number
		username: string
		email: string
		password: string
		verified: boolean
		verification_code: string
	}
}

//export type InsertUser = Omit<Database['users'], 'id'>
export type InsertUser = Insertable<Database['users']>

const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool({
			connectionString: process.env.DATABASE_URL,
		}),
	}),
});

export default db;