import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export interface JwtPayload {
    userId: string;
}

export function signJwt(payload: JwtPayload, expiresIn = '1h') {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

export function verifyJwt(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, SECRET_KEY) as JwtPayload;
    } catch (error) {
        return null;
    }
}