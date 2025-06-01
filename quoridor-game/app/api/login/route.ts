import { NextResponse } from 'next/server';
import {InsertUser} from '@/lib/db';
import {signJwt} from '@/lib/jwt';
import bcrypt from 'bcryptjs';
import db from '@/lib/db';
import dotenv from 'dotenv';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {username, password} = body;
        console.log('Received body: ', body);

        if(!username || !password){
            return NextResponse.json({error: 'Missing username/password'}, {status: 400});
        }

        const user = await db
            .selectFrom('users')
            .select(['id', 'username', 'email', 'password'])
            .where('username', '=', username)
            .executeTakeFirst();
        if(!user){
            return NextResponse.json({error: 'Invalid username or password'}, {status: 400});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){            
            return NextResponse.json({error: 'Invalid username or password'}, {status:400});
        }
        const token = signJwt({
            userId: user.id,
            username: user.username,
            email: user.email
        });
        const resp = NextResponse.json({
            message: 'login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        }, {status: 200});

        resp.cookies.set('session', token, {
            httpOnly: true,
            maxAge: 60 * 60,
            path: '/'
        });

        return resp;

    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}