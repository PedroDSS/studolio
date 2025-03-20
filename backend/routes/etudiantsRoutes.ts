import { Elysia } from "elysia";
import { createEtudiant } from "../hooks/Etudiant/createEtudiant";
import { getEtudiant } from "../hooks/Etudiant/getEtudiant";
import { getEtudiants } from "../hooks/Etudiant/getEtudiants";
import { updateEtudiant } from "../hooks/Etudiant/updateEtudiant";
import type { Etudiant } from "../interfaces/etudiant";

export const etudiantsRoutes = new Elysia({ prefix: "/etudiants" })
  .get("/", async () => {
    const etudiants = await getEtudiants();
    return etudiants;
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing etudiant ID", { status: 400 });

    const etudiant = await getEtudiant(id);
    return etudiant ? etudiant : new Response("Etudiant not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body) return new Response("Bad Request: Missing body", { status: 400 });

    await createEtudiant(body as Etudiant);
    return new Response("Etudiant created!", { status: 201 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing etudiant ID", { status: 400 });

    if (!body) return new Response("Bad Request: Missing body", { status: 400 });

    await updateEtudiant(id, body as Etudiant);
    return new Response("Etudiant updated!", { status: 200 });
  });
