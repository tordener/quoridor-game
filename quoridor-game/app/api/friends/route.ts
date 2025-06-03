import db from '@/lib/db';
import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';


export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const username = searchParams.get('username');

        if(!username) {
            return NextResponse.json({error: 'Missing username'}, {status: 400});
        }
        const result = await db
            .selectFrom('profiles')
            .select(['friends'])
            .where('username', '=', username)
            .executeTakeFirst();
        return NextResponse.json({friends: result?.friends || []});

    } catch (error) {
        console.error('Error fetching friends list', error);
        return NextResponse.json({error: 'Internal server error'}, {status: 500});
    }
}