import { Elysia } from "elysia";
import { createCategorie } from "../hooks/Categorie/createCategorie";
import { getCategorie } from "../hooks/Categorie/getCategorie";
import { getCategories } from "../hooks/Categorie/getCategories";
import { updateCategorie } from "../hooks/Categorie/updateCategorie";

export const categoriesRoutes = new Elysia({ prefix: "/categories" })
  .get("/", async () => {
    const categories = await getCategories();
    return categories;
  })

  .get("/:id", async ({ params }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing categorie ID", { status: 400 });

    const categorie = await getCategorie(id);
    return categorie ? categorie : new Response("Categorie not found", { status: 404 });
  })

  .post("/", async ({ body }) => {
    if (!body) return new Response("Bad Request: Missing body", { status: 400 });

    //TODO: Rajouter l'interface categorie.
    await createCategorie(body);
    return new Response("Categorie created!", { status: 201 });
  })

  .patch("/:id", async ({ params, body }) => {
    const { id } = params;
    if (!id) return new Response("Bad Request: Missing categorie ID", { status: 400 });

    if (!body) return new Response("Bad Request: Missing body", { status: 400 });

    await updateCategorie(id, body);
    return new Response("Categorie updated!", { status: 200 });
  });

