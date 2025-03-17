import * as jose from "jose";
import { connectAdmin } from "../hooks/Administrateur/connectAdmin";
import type { Login } from "../interfaces/login";

export async function loginRoute(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  if (req.method === "GET" && url.pathname === "/login") {
    const jwtToken = req.headers.get("Authorization")?.split(" ")[1];
    if (jwtToken) {
      try {
        const { payload } = await jose.jwtVerify(
          jwtToken.replace(/"/g, ""),
          new TextEncoder().encode(
            process.env.JWT_SECRET_ACCESS_TOKEN as string
          ),
          {
            algorithms: ["HS256"],
          }
        );
        return new Response(JSON.stringify(payload.id), {
          headers,
        });
      } catch (error) {
        return new Response("Invalid or expired token", { status: 401 });
      }
    }

    return new Response("Not authorized", { status: 401 });
  }

  if (req.method === "POST" && url.pathname === "/login") {
    const requestBody = (await req.json()) as Login;
    const accessToken = await connectAdmin(
      requestBody.email,
      requestBody.password
    );
    if (typeof accessToken === "string") {
      return new Response(JSON.stringify(accessToken), {
        headers,
      });
    }
    return accessToken;
  }
  return new Response("Not Found", { status: 404 });
}
