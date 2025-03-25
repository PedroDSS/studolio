import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/techno";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const projects: APIResponse[] = [];
  const techno: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/technos/${params.id}`)
  ).json();

  if (techno.fields.Projet) {
    for (const projet of techno.fields.Projet) {
      projects.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/projets/${projet}`)
        ).json()
      );
    }
  }
  return { techno, projects };
}
