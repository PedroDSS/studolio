import { Elysia } from "elysia";
import { createAdmin } from "../hooks/Administrateur/createAdmin";
import { getAdmin } from "../hooks/Administrateur/getAdmin";
import { getAdmins } from "../hooks/Administrateur/getAdmins";
import { updateAdmin } from "../hooks/Administrateur/updateAdmin";
import type { Administrateur, UpdateAdministrateur } from "../interfaces/administrateur";

export const adminsRoutes = new Elysia({ prefix: "/admins" })
  .get("/", async () => {
    return await getAdmins();
  })

  .get("/:id", async ({ params }) => {
    const admin = await getAdmin(params.id);
    if (!admin) {
      return new Response("Admin not found", { status: 404 });
    }
    return admin;
  })

  .post("/", async ({ body }) => {
    const requestBody = body as Administrateur;
    await createAdmin({
      Nom: requestBody.Nom,
      Prenom: requestBody.Prenom,
      Email: requestBody.Email,
      "Mot de passe": requestBody["Mot de passe"],
    });

    return new Response("Admin created!", { status: 201 });
  })

  .patch("/:id", async ({ params, body }) => {
    const requestBody = body as UpdateAdministrateur;
    await updateAdmin(params.id, requestBody);
    return new Response("Admin updated!", { status: 200 });
  });
