import * as jwt from 'jsonwebtoken';

export async function decryptToken(token: string) : Promise<any> {
    const decoded = jwt.verify(token, "stubJWT");
    return decoded;
}