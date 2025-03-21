import { Elysia } from "elysia";
import { createTechno } from "../hooks/Techno/createTechno";
import { getTechno } from "../hooks/Techno/getTechno";
import { getTechnos } from "../hooks/Techno/getTechnos";
import { updateTechno } from "../hooks/Techno/updateTechno";
import type { Techno } from "../interfaces/techno";
import { deleteTechno } from "../hooks/Techno/deleteTechno";

export const technosRoutes = new Elysia({ prefix: "/technos" })
  .get("/", async () => {
    return await getTechnos();
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing techno ID", { status: 400 });

    const techno = await getTechno(id);
    return techno
      ? techno
      : new Response("Promotion not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body)
      return new Response("Bad Request: Missing techno data", { status: 400 });

    const { Nom } = body as Techno;
    const techno = await createTechno(Nom);
    return new Response(JSON.stringify(techno), { status: 201 });
  })

  .delete("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing techno ID", {
        status: 400,
      });
    await deleteTechno(id);
    return new Response("Techno deleted", { status: 204 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing techno ID", { status: 400 });
    if (!body)
      return new Response("Bad Request: Missing techno data", { status: 400 });

    const { Nom } = body as Techno;
    const techno = await updateTechno(id, Nom);
    return new Response(JSON.stringify(techno), { status: 200 });
  });
