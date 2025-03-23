import { Elysia } from "elysia";
import {
    getProjets,
    getProjet,
    createProjet,
    updateProjet,
    deleteProjet
} from "../hooks/projetHook";
import type { Projet } from "../interfaces/projet";

export const projetsRoutes = new Elysia({ prefix: "/projets" })
    .get("/", async () => {
        const projets = await getProjets();
        return projets;
    })

    .get("/:id", async ({ params }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing projet ID", { status: 400 });

        const projet = await getProjet(id);
        return projet
            ? projet
            : new Response("Projet not found", { status: 404 });
    })

    .post("/", async ({ body }) => {
        if (!body)
            return new Response("Bad Request: Missing body", { status: 400 });

        const projet = await createProjet(body as Projet);
        return new Response(JSON.stringify(projet), { status: 201 });
    })

    .delete("/:id", async ({ params }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing projet ID", {
                status: 400,
            });
        await deleteProjet(id);
        return new Response("Projet deleted", { status: 204 });
    })

    .patch("/:id", async ({ params, body }) => {
        const { id } = params;
        if (!id)
            return new Response("Bad Request: Missing projet ID", { status: 400 });

        if (!body)
            return new Response("Bad Request: Missing body", { status: 400 });

        const projet = await updateProjet(id, body as Projet);
        return new Response(JSON.stringify(projet), { status: 200 });
    });
