import { Elysia } from "elysia";
import { createCategorie } from "../hooks/Categorie/createCategorie";
import { getCategorie } from "../hooks/Categorie/getCategorie";
import { getCategories } from "../hooks/Categorie/getCategories";
import { updateCategorie } from "../hooks/Categorie/updateCategorie";
import type { Categorie } from "../interfaces/categorie";
import { deleteCategorie } from "../hooks/Categorie/deleteCategorie";

export const categoriesRoutes = new Elysia({ prefix: "/categories" })
  .get("/", async () => {
    const categories = await getCategories();
    return categories;
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing categorie ID", { status: 400 });

    const categorie = await getCategorie(id);
    return categorie
      ? categorie
      : new Response("Categorie not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });

    const { Nom } = body as Categorie;
    const categorie = await createCategorie(Nom);
    return new Response(JSON.stringify(categorie), { status: 201 });
  })

  .delete("/:id", async ({ params }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing categorie ID", {
        status: 400,
      });
    await deleteCategorie(id);
    return new Response("Categorie deleted", { status: 204 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id)
      return new Response("Bad Request: Missing categorie ID", { status: 400 });

    if (!body)
      return new Response("Bad Request: Missing body", { status: 400 });

    const { Nom } = body as Categorie;
    const categorie = await updateCategorie(id, Nom);
    return new Response(JSON.stringify(categorie), { status: 200 });
  });
