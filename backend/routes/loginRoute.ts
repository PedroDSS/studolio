import { Elysia } from "elysia";
import * as jose from "jose";
import { connectAdmin } from "../hooks/adminHook";
import type { Login } from "../interfaces/login";

export const loginRoute = new Elysia({ prefix: "/login" })
  .get("/", async ({ headers }) => {
    const authHeader = headers.authorization;
    if (!authHeader) return new Response("Not authorized", { status: 401 });

    const token = authHeader.split(" ")[1]?.replace(/"/g, "");
    if (!token) return new Response("Invalid token", { status: 401 });

    try {
      const payload = jose.decodeJwt(token);
      return { id: payload.id };
    } catch (error) {
      return new Response("Invalid or expired token", { status: 401 });
    }
  })

  .post("/", async ({ body }) => {
    const { email, password } = body as Login;
    const accessToken = await connectAdmin(email, password);

    if (typeof accessToken === "string") {
      return { token: accessToken };
    }

    return new Response("Unauthorized", { status: 401 });
  });
