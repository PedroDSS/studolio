import { Elysia } from "elysia";
import { updatePasswordAdmin } from "../hooks/Administrateur/updatePasswordAdmin";
import type { Administrateur } from "../interfaces/administrateur";

export const updatePasswordRoute = new Elysia({ prefix: "/updatePassword" })
  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing admin ID", { status: 400 });

    if (!body) return new Response("Bad Request: Missing password", { status: 400 });

    await updatePasswordAdmin(id, body as Administrateur["Mot de passe"]);
    return new Response("Password updated!", { status: 200 });
  });
