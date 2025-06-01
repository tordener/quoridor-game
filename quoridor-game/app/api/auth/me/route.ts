import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import {verifyJwt} from '@/lib/jwt';

export async function GET() {
    const cookie = (await cookies()).get('session')?.value;
    if(!cookie){
        return NextResponse.json({error: 'unauthorized'}, {status: 401});
    }
    try {
        const payload = verifyJwt(cookie);
        return NextResponse.json({user: payload});
    } catch {
        return NextResponse.json({error: 'invalid token'}, {status: 401});
    }
}