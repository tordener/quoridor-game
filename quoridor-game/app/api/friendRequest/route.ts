import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {parseToken} from '@/lib/cookies';
import { sql } from 'kysely';
import {db} from '@/lib/db';
import {verifyJwt} from '@/lib/jwt';

//{requestId: notif_id, accept: action, from_user, to_user})

export async function POST(req: NextRequest) {
    try {
        const cookieHeader = req.headers.get('cookie') || '';
        const token = parseToken('session', cookieHeader);

        if(!token) {
            return NextResponse.json({error: 'invalid token'}, {status: 401});
        }
        const payload = verifyJwt(token);
        console.log("FRICK     ", payload);
        if(!payload || !payload.username){
            return NextResponse.json({error: 'missing required fields'}, {status: 400});
        }
        const from_user = payload.username;
        console.log('PAYLOAD FR: ------------------->', payload);
        const body = await req.json();
        const {notificationId, to_user, accept} = body;
        console.log('BODY OF HTTP HEADER: ---------> ', from_user);

        if(!notificationId || accept === undefined) {
            return NextResponse.json({error: 'missing required fields after JWT'}, {status: 400});
        }

        if(accept === true) {
            const inserted = await db
                .updateTable('profiles')
                .set({
                    friends: sql`array_append(friends, ${body.from_user})`
                })
                .where('username', '=', body.to_user)
                .execute();
            return NextResponse.json({success: true});
        } else {
            const inserted = await db
                .deleteFrom('notifications')
                .where('id', '=', notificationId)
                .execute();
        }
    } catch (error) {
        console.error('An error occured while trying to evaluate the friend request', error);
        return NextResponse.json({error: 'internal server error'}, {status: 500});
    }
}