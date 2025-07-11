import * as jose from "jose";

export async function createToken(id, usertype) {
  const token = await new jose.SignJWT({ id, usertype })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));

  return token;
}
