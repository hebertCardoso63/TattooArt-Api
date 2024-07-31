import jwt from 'jsonwebtoken';

const { SECRET_KEY_TOKEN } = process.env;

export function generateToken(payload: any): string {
    return jwt.sign(payload, SECRET_KEY_TOKEN!, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    return jwt.verify(token, SECRET_KEY_TOKEN!);
}
