import { NextResponse } from 'next/server';
//import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';


export async function GET(request: Request) {
    const url = new URL(request.url);
    const username = url.searchParams.get('user');
    const verificationCode = url.searchParams.get('verificationCode');

    if(!username || !verificationCode) {
        return NextResponse.json({error: 'User verification failed'}, {status: 400});
    }

    try {
        const user = await db
            .selectFrom('users')
            .select(['verification_code', 'verified'])
            .where('username', '=', username)
            .executeTakeFirst();

        if(!user || user.verified || user.verification_code !== verificationCode) {
            return NextResponse.json({message: 'User verification failed'}, {status: 400});
        }

        await db
            .updateTable('users')
            .set({verified: true})
            .where('username', '=', username)
            .execute();
        return NextResponse.json({message: 'User verification successful'}, {status: 200});
        
        } catch (error) {
            console.error('verification error: ', error);
            return NextResponse.json({error: 'internal server error'}, {status: 500});
        }
}