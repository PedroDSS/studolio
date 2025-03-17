import { createPromotion } from "../hooks/Promotion/createPromotion";
import { getPromotion } from "../hooks/Promotion/getPromotion";
import { getPromotions } from "../hooks/Promotion/getPromotions";
import { updatePromotion } from "../hooks/Promotion/updatePromotion";

export async function promotionsRoutes(
  req: Request,
  url: URL,
  headers: { [key: string]: string }
): Promise<Response> {
  const pathRegexForID = /^\/promotions\/([^\/]+)$/;

  if (req.method === "GET" && url.pathname === "/promotions") {
    const promotions = await getPromotions();
    return new Response(JSON.stringify(promotions), {
      headers,
    });
  }

  if (req.method === "GET") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const promotion = await getPromotion(id);
      return new Response(JSON.stringify(promotion), {
        headers,
      });
    }
    return new Response("Bad Request: Missing promotion ID", {
      status: 400,
      headers,
    });
  }

  if (req.method === "POST" && url.pathname === "/promotions") {
    const requestBody = (await req.json()) as string;
    await createPromotion(requestBody);

    return new Response("Promotion created !", {
      status: 201,
      headers,
    });
  }

  if (req.method === "PATCH") {
    const match = url.pathname.match(pathRegexForID);
    const id = match && match[1];
    if (id) {
      const requestBody = (await req.json()) as string;
      await updatePromotion(id, requestBody);
      return new Response("Promotion updated!", {
        status: 200,
        headers,
      });
    }
    return new Response("Bad Request: Missing promotion ID", {
      status: 400,
      headers,
    });
  }

  return new Response("Not Found", { status: 404 });
}
