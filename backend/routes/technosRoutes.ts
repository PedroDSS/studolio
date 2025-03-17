import { createTechno } from "../hooks/Techno/createTechno";
import { getTechno } from "../hooks/Techno/getTechno";
import { getTechnos } from "../hooks/Techno/getTechnos";
import { updateTechno } from "../hooks/Techno/updateTechno";

export async function technosRoutes(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/technos\/([^\/]+)$/;

  if (req.method === "GET" && url.pathname === "/technos") {
    const technos = await getTechnos();
    return new Response(JSON.stringify(technos), {
      headers,
    });
  }

  if (req.method === "GET") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const techno = await getTechno(id);
      return new Response(JSON.stringify(techno), {
        headers,
      });
    }
    return new Response("Bad Request: Missing techno ID", {
      status: 400,
      headers,
    });
  }

  if (req.method === "POST" && url.pathname === "/technos") {
    const requestBody = (await req.json()) as string;
    await createTechno(requestBody);

    return new Response("Techno created !", {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const requestBody = (await req.json()) as string;
      await updateTechno(id, requestBody);
      return new Response("Techno updated!", {
        status: 200,
        headers,
      });
    }
    return new Response("Bad Request: Missing techno ID", {
      status: 400,
      headers,
    });
  }

  return new Response("Not Found", { status: 404 });
}
