import { Elysia } from "elysia";
import { createPromotion } from "../hooks/Promotion/createPromotion";
import { getPromotion } from "../hooks/Promotion/getPromotion";
import { getPromotions } from "../hooks/Promotion/getPromotions";
import { updatePromotion } from "../hooks/Promotion/updatePromotion";
import type { Promotion } from "../interfaces/promotion";
import { deletePromotion } from "../hooks/Promotion/deletePromotion";

export const promotionsRoutes = new Elysia({ prefix: "/promotions" })
  .get("/", async () => {
    return await getPromotions();
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing promotion ID", { status: 400 });

    const promotion = await getPromotion(id);
    return promotion
      ? promotion
      : new Response("Promotion not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body)
      return new Response("Bad Request: Missing promotion data", {
        status: 400,
      });

    const { Nom } = body as Promotion;
    const promotion = await createPromotion(Nom);
    return new Response(JSON.stringify(promotion), { status: 201 });
  })

  .delete("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing promotion ID", {
        status: 400,
      });
    await deletePromotion(id);
    return new Response("Promotion deleted", { status: 204 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing promotion ID", { status: 400 });
    if (!body)
      return new Response("Bad Request: Missing promotion data", {
        status: 400,
      });

    const { Nom } = body as Promotion;
    const promotion = await updatePromotion(id, Nom);
    return new Response(JSON.stringify(promotion), { status: 200 });
  });
