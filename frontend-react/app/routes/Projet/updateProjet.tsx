import { redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/updateProjet";
import type {
  CategoryResponse,
  EtudiantResponse,
  TechnoResponse,
} from "~/interfaces/APIResponse";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }

  const responseProjet = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/projets/${params.id}`,
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

  const responseCategories = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/categories/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseTechnos = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/technos/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseEtudiants = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/etudiants/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    projet: await responseProjet.json(),
    categories: await responseCategories.json(),
    technos: await responseTechnos.json(),
    etudiants: await responseEtudiants.json(),
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");

  if (formData.get("intent") === "update") {
    const technos = formData.getAll("technos");
    const etudiants = formData.getAll("etudiants");

    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/projets/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Description: formData.get("description"),
          Mots: formData.get("mots"),
          GitHub: formData.get("github"),
          Publié: formData.has("published"),
          Catégorie: [formData.get("categorie")],
          Technos: technos,
          Étudiants: etudiants,
        }),
      }
    );
    return redirect(`/admin/projets/${formData.get("id")}`);
  }
}

export default function UpdateProjet({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const navigate = useNavigate();
  const { projet, categories, technos, etudiants } = loaderData;
  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => navigate("/admin/projets")}
      >
        Retour à la liste
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modification du projet
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={projet.id} />
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nom du projet
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            defaultValue={projet.fields.Nom}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description du projet
          </Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={projet.fields.Description}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="mots" className="text-sm font-medium text-gray-700">
            Mot-clé du projet
          </Label>
          <Input
            id="mots"
            name="mots"
            type="text"
            defaultValue={projet.fields.Mots}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="github" className="text-sm font-medium text-gray-700">
            Lien GitHub du projet
          </Label>
          <Input
            id="github"
            name="github"
            type="text"
            defaultValue={projet.fields.GitHub}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="published">Publié</Label>
          <input type="checkbox" id="published" name="published" />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="categorie"
            className="text-sm font-medium text-gray-700"
          >
            Catégorie du projet
          </Label>
          <select
            id="categorie"
            name="categorie"
            defaultValue={projet.fields.Catégorie[0]}
            className="border border-gray-300 rounded p-2 focus:ring-green-500 focus:border-green-500"
          >
            {categories.records.map((categorie: CategoryResponse) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="etudiants"
            className="text-sm font-medium text-gray-700"
          >
            Étudiants associés
          </Label>
          <select
            id="etudiants"
            name="etudiants"
            multiple
            defaultValue={projet.fields.Étudiants}
            className="border border-gray-300 rounded p-2 focus:ring-green-500 focus:border-green-500"
          >
            {etudiants.records.map((etudiant: EtudiantResponse) => (
              <option key={etudiant.id} value={etudiant.id}>
                {etudiant.fields.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="technos"
            className="text-sm font-medium text-gray-700"
          >
            Technologies utilisées
          </Label>
          <select
            id="technos"
            name="technos"
            multiple
            defaultValue={projet.fields.Technos}
            className="border border-gray-300 rounded p-2 focus:ring-green-500 focus:border-green-500"
          >
            {technos.records.map((techno: TechnoResponse) => (
              <option key={techno.id} value={techno.id}>
                {techno.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        {busy ? (
          <Spinner />
        ) : (
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Modifier le projet
          </Button>
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
