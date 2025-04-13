import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/etudiant";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const projects: APIResponse[] = [];
  let currentPromotion: string = "";
  const etudiant: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/etudiants/${params.id}`)
  ).json();

  if (etudiant.fields.Promotion) {
    for (const promotion of etudiant.fields.Promotion) {
      const result = await (
        await fetch(`${import.meta.env.VITE_API_URL}/promotions/${promotion}`)
      ).json();
      currentPromotion = result.fields.Nom;
    }
  }
  if (etudiant.fields.Projet) {
    for (const projet of etudiant.fields.Projet) {
      projects.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/projets/${projet}`)
        ).json()
      );
    }
  }

  return { etudiant, projects, currentPromotion };
}
