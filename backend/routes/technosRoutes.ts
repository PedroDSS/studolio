import { Elysia } from "elysia";
import { createTechno } from "../hooks/Techno/createTechno";
import { getTechno } from "../hooks/Techno/getTechno";
import { getTechnos } from "../hooks/Techno/getTechnos";
import { updateTechno } from "../hooks/Techno/updateTechno";

export const technosRoutes = new Elysia({ prefix: "/technos" })
  .get("/", async () => {
    return await getTechnos();
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing techno ID", { status: 400 });

    return await getTechno(id);
  })

  .post("/", async ({ body }) => {
    if (!body) return new Response("Bad Request: Missing techno data", { status: 400 });

    await createTechno(body as string);
    return { message: "Techno created!" };
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing techno ID", { status: 400 });
    if (!body) return new Response("Bad Request: Missing techno data", { status: 400 });

    await updateTechno(id, body as string);
    return { message: "Techno updated!" };
  });
