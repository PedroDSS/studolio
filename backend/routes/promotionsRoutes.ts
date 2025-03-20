import { Elysia } from "elysia";
import { createPromotion } from "../hooks/Promotion/createPromotion";
import { getPromotion } from "../hooks/Promotion/getPromotion";
import { getPromotions } from "../hooks/Promotion/getPromotions";
import { updatePromotion } from "../hooks/Promotion/updatePromotion";

export const promotionsRoutes = new Elysia({ prefix: "/promotions" })
  .get("/", async () => {
    return await getPromotions();
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing promotion ID", { status: 400 });

    return await getPromotion(id);
  })

  .post("/", async ({ body }) => {
    if (!body) return new Response("Bad Request: Missing promotion data", { status: 400 });

    await createPromotion(body as string);
    return new Response("Promotion created!", { status: 201 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing promotion ID", { status: 400 });
    if (!body) return new Response("Bad Request: Missing promotion data", { status: 400 });

    await updatePromotion(id, body as string);
    return new Response("Promotion updated!", { status: 200 });
  });
