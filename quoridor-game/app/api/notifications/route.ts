import {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {verifyJwt} from '@/lib/jwt';
import { db } from '@/lib/db';


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
            .orderBy('created_at', 'desc')
            .execute();
        
        return NextResponse.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}