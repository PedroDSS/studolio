import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/promotion";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const etudiants: APIResponse[] = [];
  const promotion: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/promotions/${params.id}`)
  ).json();

  if (promotion.fields.Étudiant) {
    for (const etudiant of promotion.fields.Étudiant) {
      etudiants.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/etudiants/${etudiant}`)
        ).json()
      );
    }
  }

  return { promotion, etudiants };
}
