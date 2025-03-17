import * as jose from "jose";

export async function getToken(
  payload: jose.JWTPayload,
  expireIn?: string
): Promise<string> {
  const signJwt = new jose.SignJWT(payload).setProtectedHeader({
    alg: "HS256",
  });

  if (expireIn) {
    signJwt.setExpirationTime(expireIn);
  }

  return await signJwt.sign(
    new TextEncoder().encode(process.env.JWT_SECRET_ACCESS_TOKEN)
  );
}
