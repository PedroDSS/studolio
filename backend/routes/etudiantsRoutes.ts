import { Elysia } from "elysia";
import { createEtudiant } from "../hooks/Etudiant/createEtudiant";
import { getEtudiant } from "../hooks/Etudiant/getEtudiant";
import { getEtudiants } from "../hooks/Etudiant/getEtudiants";
import { updateEtudiant } from "../hooks/Etudiant/updateEtudiant";
import type { Etudiant } from "../interfaces/etudiant";
import { deleteEtudiant } from "../hooks/Etudiant/deleteEtudiant";

export const etudiantsRoutes = new Elysia({ prefix: "/etudiants" })
  .get("/", async () => {
    const etudiants = await getEtudiants();
    return etudiants;
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing etudiant ID", { status: 400 });

    const etudiant = await getEtudiant(id);
    return etudiant
      ? etudiant
      : new Response("Etudiant not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });

    const etudiant = await createEtudiant(body as Etudiant);
    return new Response(JSON.stringify(etudiant), { status: 201 });
  })

  .delete("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing etudiant ID", {
        status: 400,
      });
    await deleteEtudiant(id);
    return new Response("Etudiant deleted", { status: 204 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing etudiant ID", { status: 400 });

    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });

    const etudiant = await updateEtudiant(id, body as Etudiant);
    return new Response(JSON.stringify(etudiant), { status: 200 });
  });
