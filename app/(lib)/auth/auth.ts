import { jwtVerify, decodeJwt } from "jose";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key not set");
  }
  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    return null;
  }
}

export function decodeJWT(token:string){
  try {
    const payload = decodeJwt(token);
    return payload;
  } catch (error) {
    return null;
  }
}