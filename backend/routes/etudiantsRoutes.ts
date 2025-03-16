import { createEtudiant } from "../hooks/Etudiant/createEtudiant";
import { getEtudiant } from "../hooks/Etudiant/getEtudiant";
import { getEtudiants } from "../hooks/Etudiant/getEtudiants";
import { updateEtudiant } from "../hooks/Etudiant/updateEtudiant";
import type { Etudiant } from "../interfaces/etudiant";

export async function etudiantsRoutes(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/etudiants\/([^\/]+)$/;

  if (req.method === "GET" && url.pathname === "/etudiants") {
    const etudiants = await getEtudiants();
    return new Response(JSON.stringify(etudiants), {
      headers,
    });
  }

  if (req.method === "GET") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];

    if (id) {
      const etudiant = await getEtudiant(id);
      return new Response(JSON.stringify(etudiant), {
        headers,
      });
    }
    return new Response("Bad Request: Missing etudiant ID", {
      status: 400,
      headers,
    });
  }

  if (req.method === "POST" && url.pathname === "/etudiants") {
    const requestBody = (await req.json()) as Etudiant;
    await createEtudiant(requestBody);

    return new Response("Etudiant created !", {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const requestBody = (await req.json()) as Etudiant;
      await updateEtudiant(id, requestBody);
      return new Response("Etudiant updated!", {
        status: 200,
        headers,
      });
    }
    return new Response("Bad Request: Missing etudiant ID", {
      status: 400,
      headers,
    });
  }
  return new Response("Not Found", { status: 404 });
}
