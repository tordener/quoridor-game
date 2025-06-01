import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({message: 'logged out'});

    response.cookies.set('session', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0)
    });

    return response;
}