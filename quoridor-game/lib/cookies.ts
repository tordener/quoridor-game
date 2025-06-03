export function parseToken(token_type: string, cookieHeader = req.headers.get('cookie') || ''){
    try{
        if(token_type === 'session'){
            //cookieHeader = req.headers.get('cookie') || '';
            const token = cookieHeader
                .split('; ')
                .find((row) => row.startsWith('session='))
                ?.split('=')[1];   
                return token;
        }
        if(token_type === 'cookie'){
                //cookieHeader = req.headers.get('cookie') || '';
                const token = cookieHeader
                .split('; ')
                .find((row) => row.startsWith('cookie='))
                ?.split('=')[1];
                return token;
        }
    } catch (error) {
        console.log('failed parsing token', error)
    }
}