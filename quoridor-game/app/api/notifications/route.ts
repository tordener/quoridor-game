import {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {verifyJwt} from '@/lib/jwt';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        const token = cookieHeader
            .split('; ')
            .find((row) => row.startsWith('session='))
            ?.split('=')[1];
        if(!token) {
            return NextResponse.json({error: 'unauthorized'}, {status: 401});
        }
        const payload = verifyJwt(token);
        if(!payload || !payload.username) {
            return NextResponse.json({error: 'invalid token'}, {status: 401});
        }
        const from_user = payload.username;
        const body = await req.json();
        console.log('Notifications POST Body -->:', body);

        const {to_user, type, message} = body;
        if(!to_user || !type || !message) {
            return NextResponse.json({error: 'missing fields'}, {status: 400});
        } 

        const inserted = await db
            .insertInto('notifications')
            .values({
                to_user,
                from_user,
                type,
                message,
                seen: false,
                status: 'pending'
            })
            .executeTakeFirst();
        return NextResponse.json({success: true})
        } catch (error) {
            console.error('error creating notification: ', error);
            return NextResponse.json({error: 'internal server error'}, {status: 500});
    }
}
export async function GET(req: NextRequest) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        console.log('Incoming cookie: ', cookieHeader);
        const token  = cookieHeader
            .split('; ')
            .find(row => row.startsWith('session='))
            ?.split('=')[1];
        
        console.log('EXTRACTED TOKEN: --------------->', token);
            
        if(!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        
        const payload = verifyJwt(token);
        console.log('Decoded JWT payload:', payload);
        if(!payload || !payload.username) {
            return NextResponse.json({error: 'Invalid token'}, {status: 401});
        }
        
        const username = payload.username;

        const notifications = await db
            .selectFrom('notifications')
            .selectAll()
            .where('to_user', '=', username)
            .where('seen','=', false)
            .where('status', '=', 'pending')
            .orderBy('created_at', 'desc')
            .execute();
            // .selectFrom('notifications')
            // .selectAll()
            // .where('to_user', '=', username)
            // .orderBy('created_at', 'desc')
            // .execute();
        
        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}