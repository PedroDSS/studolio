import { connectAdmin } from "../hooks/Administrateur/connectAdmin";
import type { Login } from "../interfaces/login";

export async function loginRoute(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  if (req.method === "POST" && url.pathname === "/login") {
    const requestBody = (await req.json()) as Login;
    const admin = await connectAdmin(requestBody.email, requestBody.password);
    return new Response(JSON.stringify(admin), {
      headers,
    });
  }
  return new Response("Not Found", { status: 404 });
}
