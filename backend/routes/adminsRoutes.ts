import { createAdmin } from "../hooks/Administrateur/createAdmin";
import { getAdmin } from "../hooks/Administrateur/getAdmin";
import { getAdmins } from "../hooks/Administrateur/getAdmins";
import { updateAdmin } from "../hooks/Administrateur/updateAdmin";
import type {
  Administrateur,
  UpdateAdministrateur,
} from "../interfaces/administrateur";

export async function adminsRoutes(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/admins\/([^\/]+)$/;

  if (req.method === "GET" && url.pathname === "/admins") {
    const admins = await getAdmins();
    return new Response(JSON.stringify(admins), {
      headers,
    });
  }

  if (req.method === "GET") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const admin = await getAdmin(id);
      return new Response(JSON.stringify(admin), {
        headers,
      });
    }
    return new Response("Bad Request: Missing admin ID", {
      status: 400,
      headers,
    });
  }

  if (req.method === "POST" && url.pathname === "/admins") {
    const requestBody = (await req.json()) as Administrateur;
    await createAdmin({
      Nom: requestBody.Nom,
      Prenom: requestBody.Prenom,
      Email: requestBody.Email,
      "Mot de passe": requestBody["Mot de passe"],
    });

    return new Response("Admin created !", {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const requestBody = (await req.json()) as UpdateAdministrateur;
      await updateAdmin(id, requestBody);
      return new Response("Admin updated!", {
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
