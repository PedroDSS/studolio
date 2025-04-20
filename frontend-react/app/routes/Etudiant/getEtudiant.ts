import type {
  EtudiantResponse,
  ProjetResponse,
} from "~/interfaces/APIResponse";
import type { Route } from "./+types/etudiant";
import { redirect } from "react-router";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  let etudiant: EtudiantResponse;
  let projets: ProjetResponse[] = [];
  let currentPromotion: string = "";
  if (!token) {
    return redirect("/");
  }
  const responseEtudiant = await fetch(
    `${import.meta.env.VITE_API_URL}/etudiants/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseEtudiant.ok) {
    const errorData = await responseEtudiant.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  etudiant = await responseEtudiant.json();

  if (etudiant.fields.Promotion) {
    for (const promotion of etudiant.fields.Promotion) {
      const result = await (
        await fetch(`${import.meta.env.VITE_API_URL}/promotions/${promotion}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      currentPromotion = result.fields.Nom;
    }
  }
  if (etudiant.fields.Projet) {
    for (const projet of etudiant.fields.Projet) {
      projets.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/projets/${projet}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).json()
      );
    }
  }

  return { etudiant, projets, currentPromotion };
}
