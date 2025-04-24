import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createProjet";
import type {
  CategoryResponse,
  EtudiantResponse,
  ProjetResponse,
  TechnoResponse,
} from "~/interfaces/APIResponse";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const responseCategories = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/categories/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseCategories.ok) {
    const errorData = await responseCategories.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  const responseTechnos = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/technos/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseTechnos.ok) {
    const errorData = await responseTechnos.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  const responseEtudiants = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/etudiants/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseEtudiants.ok) {
    const errorData = await responseEtudiants.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  return {
    categories: await responseCategories.json(),
    technos: await responseTechnos.json(),
    etudiants: await responseEtudiants.json(),
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "create") {
    const technos = formData.getAll("technos");
    const etudiants = formData.getAll("etudiants");
    const newProjet: ProjetResponse = await (
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/projets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Description: formData.get("description"),
          Mots: formData.get("mots"),
          GitHub: formData.get("github"),
          Catégorie: [formData.get("categorie")],
          Technos: technos,
          Étudiants: etudiants,
        }),
      })
    ).json();
    return redirect(`/admin/projets/${newProjet.id}`);
  }
}

export default function CreateProjet({ loaderData }: Route.ComponentProps) {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";
  const { categories, etudiants, technos } = loaderData;

  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/admin/projets")}
      >
        Retour à la liste
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Création d'un nouveau projet
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="create" />
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nom du projet
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            placeholder="Entrez le nom du projet"
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
            placeholder="Entrez la description du projet"
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
            placeholder="Entrez le mot-clé du projet"
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
            placeholder="Entrez le lien github du projet"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
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
            className="border border-gray-300 rounded p-2 focus:ring-green-500 focus:border-green-500"
          >
            {technos.records.map((techno: TechnoResponse) => (
              <option key={techno.id} value={techno.id}>
                {techno.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="promotion"
            className="text-sm font-medium text-gray-700"
          >
            Catégorie du projet
          </Label>
          <Select name="promotion">
            <SelectTrigger className="w-full h-12 px-3 bg-white border border-gray-300 rounded focus:ring-green-500 focus:border-green-500">
              <SelectValue placeholder="Catégorie..." />
            </SelectTrigger>
            <SelectContent>
              {categories.records.map((result: CategoryResponse) => (
                <SelectItem key={result.id} value={result.id}>
                  {result.fields.Nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {busy ? (
          <Spinner />
        ) : (
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Créer le projet
          </Button>
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
