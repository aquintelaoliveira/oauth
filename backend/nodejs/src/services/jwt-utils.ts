import path from 'path';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config({ path: path.join(path.resolve(), '..', '..','.env') });

const JWT_PUBLIC_KEY = process.env.JWT_PUBLIC_KEY!;
const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY!;

export const signJWT = (payload: string, expiresIn: string) => {
  return jwt.sign(payload, JWT_PRIVATE_KEY, { algorithm: "RS256", expiresIn });
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
    return { payload: decoded, expired: false };
  } catch (err) {
    return { payload: null, expired: err.message.includes("jwt expired") };
  }
}
