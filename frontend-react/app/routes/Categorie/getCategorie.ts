import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/categorie";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const projects: APIResponse[] = [];
  const categorie: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/categories/${params.id}`)
  ).json();

  if (categorie.fields.Projet) {
    for (const projet of categorie.fields.Projet) {
      projects.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/projets/${projet}`)
        ).json()
      );
    }
  }

  return { categorie, projects };
}
