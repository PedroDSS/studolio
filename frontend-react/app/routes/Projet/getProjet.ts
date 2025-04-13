import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/projet";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const technos: APIResponse[] = [];
  const etudiants: APIResponse[] = [];
  let projetCategorie: string = "";
  const commentaires: APIResponse[] = [];
  const projet: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/projets/${params.id}`)
  ).json();

  if (projet.fields.Technos) {
    for (const techno of projet.fields.Technos) {
      technos.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/technos/${techno}`)
        ).json()
      );
    }
  }

  if (projet.fields["Étudiants"]) {
    for (const etudiant of projet.fields["Étudiants"]) {
      etudiants.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/etudiants/${etudiant}`)
        ).json()
      );
    }
  }

  if (projet.fields["Catégorie"]) {
    for (const categorie of projet.fields["Catégorie"]) {
      const result = await (
        await fetch(`${import.meta.env.VITE_API_URL}/categories/${categorie}`)
      ).json();
      projetCategorie = result.fields.Nom;
    }
  }

  return { projet, technos, etudiants, projetCategorie };
}
