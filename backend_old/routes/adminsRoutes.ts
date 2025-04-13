import { Elysia } from "elysia";
import {
  getAdmins,
  getAdmin,
  createAdmin,
  updateAdmin,
  deleteAdmin
} from "../hooks/adminHook";
import type {
  Administrateur,
  UpdateAdministrateur,
} from "../interfaces/administrateur";

export const adminsRoutes = new Elysia({ prefix: "/admins" })
  .get("/", async () => {
    return await getAdmins();
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing admin ID", {
        status: 400,
      });
    const admin = await getAdmin(id);
    return admin ? admin : new Response("Admin not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });
    const admin = await createAdmin(body as Administrateur);

    return new Response(JSON.stringify(admin), {
      status: 201,
    });
  })

  .delete("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing admin ID", {
        status: 400,
      });
    await deleteAdmin(id);
    return new Response("Admin deleted", { status: 204 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing admin ID", {
        status: 400,
      });
    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });

    const admin = await updateAdmin(id, body as UpdateAdministrateur);
    return new Response(JSON.stringify(admin), { status: 200 });
  });
