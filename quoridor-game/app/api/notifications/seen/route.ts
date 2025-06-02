import {NextResponse} from 'next/server';
import {db} from '@/lib/db';
import {verifyJwt} from '@/lib/jwt';


export async function POST (req: Request) {
    const token = req.headers.get('cookie')
        ?.split('; ')
        .find(c => c.startsWith('session='))
        ?.split('=')[1];
    if (!token) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    try {
        const {username} = await verifyJwt(token);

        await db
            .updateTable('notifications')
            .set({seen: true})
            .where('to_user', '=', username)
            .where('seen', '=', false)
            .where('type', 'not in', ['friend_request', 'challenge'])
            .execute();


        return NextResponse.json({success: true});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }



}