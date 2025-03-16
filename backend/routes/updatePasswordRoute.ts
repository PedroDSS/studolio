import { updatePasswordAdmin } from "../hooks/Administrateur/updatePasswordAdmin";
import type { Administrateur } from "../interfaces/administrateur";

export async function updatePasswordRoute(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/updatePassword\/([^\/]+)$/;

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];

    if (id) {
      const requestBody = (await req.json()) as Administrateur["Mot de passe"];
      await updatePasswordAdmin(id, requestBody);
      return new Response("Password updated!", {
        status: 200,
        headers,
      });
    }
    return new Response("Bad Request: Missing admin ID", {
      status: 400,
      headers,
    });
  }

  return new Response("Not Found", { status: 404 });
}
