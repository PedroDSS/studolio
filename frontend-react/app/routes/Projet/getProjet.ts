import type {
  CommentResponse,
  EtudiantResponse,
  ProjetResponse,
  TechnoResponse,
} from "~/interfaces/APIResponse";
import type { Route } from "./+types/projet";
import { redirect } from "react-router";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  let projet: ProjetResponse;
  let projetCategorie: string = "";
  let technos: TechnoResponse[] = [];
  let etudiants: EtudiantResponse[] = [];
  let commentaires: CommentResponse[] = [];
  if (!token) {
    return redirect("/");
  }

  const responseProjet = await fetch(
    `${import.meta.env.VITE_API_URL}/projets/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseProjet.ok) {
    const errorData = await responseProjet.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  projet = await responseProjet.json();

  if (projet.fields.Technos) {
    for (const techno of projet.fields.Technos) {
      technos.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/technos/${techno}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).json()
      );
    }
  }

  if (projet.fields["Étudiants"]) {
    for (const etudiant of projet.fields["Étudiants"]) {
      etudiants.push(
        await (
          await fetch(`${import.meta.env.VITE_API_URL}/etudiants/${etudiant}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        ).json()
      );
    }
  }

  if (projet.fields.Commentaire) {
    for (const commentaire of projet.fields.Commentaire) {
      const commentData = await (
        await fetch(`${import.meta.env.VITE_API_URL}/comments/${commentaire}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      if (commentData.fields.Administrateur) {
        const authorData = await (
          await fetch(
            `${import.meta.env.VITE_API_URL}/admins/${
              commentData.fields.Administrateur
            }`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).json();
        commentData.fields.AuthorName = authorData.fields.Name;
      } else {
        commentData.fields.AuthorName = "Anonyme";
      }

      commentaires.push(commentData);
    }
  }

  if (projet.fields["Catégorie"]) {
    for (const categorie of projet.fields["Catégorie"]) {
      const result = await (
        await fetch(`${import.meta.env.VITE_API_URL}/categories/${categorie}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ).json();
      projetCategorie = result.fields.Nom;
    }
  }

  return { projet, technos, etudiants, projetCategorie, commentaires };
}
