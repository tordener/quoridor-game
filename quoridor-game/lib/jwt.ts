import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'testing';

export const signJwt = (payload: object) => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
};


export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};