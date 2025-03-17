import { createCategorie } from "../hooks/Categorie/createCategorie";
import { getCategorie } from "../hooks/Categorie/getCategorie";
import { getCategories } from "../hooks/Categorie/getCategories";
import { updateCategorie } from "../hooks/Categorie/updateCategorie";

export async function categoriesRoutes(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/categories\/([^\/]+)$/;

  if (req.method === "GET" && url.pathname === "/categories") {
    const categories = await getCategories();
    return new Response(JSON.stringify(categories), {
      headers,
    });
  }

  if (req.method === "GET") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const categorie = await getCategorie(id);
      return new Response(JSON.stringify(categorie), {
        headers,
      });
    }
    return new Response("Bad Request: Missing categorie ID", {
      status: 400,
      headers,
    });
  }

  if (req.method === "POST" && url.pathname === "/categories") {
    const requestBody = (await req.json()) as string;
    await createCategorie(requestBody);

    return new Response("Categorie created !", {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const requestBody = (await req.json()) as string;
      await updateCategorie(id, requestBody);
      return new Response("Categorie updated!", {
        status: 200,
        headers,
      });
    }
    return new Response("Bad Request: Missing categorie ID", {
      status: 400,
      headers,
    });
  }

  return new Response("Not Found", { status: 404 });
}
