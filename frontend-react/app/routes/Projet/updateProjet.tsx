import { redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/updateProjet";
import type {
  CategoryResponse,
  EtudiantResponse,
  TechnoResponse,
} from "~/interfaces/APIResponse";
import { Fragment, useState } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components";
import Select from "react-select"; // Assurez-vous d'importer react-select

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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const nom = formData.get("nom");
    const description = formData.get("description");
    const mots = formData.get("mots");
    const github = formData.get("github");
    const technos = formData.getAll("technos");
    const etudiants = formData.getAll("etudiants");
    const categorie = formData.get("categorie");

    const newErrors: { [key: string]: string } = {};

    if (!nom) newErrors.nom = "Le nom du projet est obligatoire.";
    if (!description) newErrors.description = "La description est obligatoire.";
    if (!mots) newErrors.mots = "Le mot-clé est obligatoire.";
    if (!github) newErrors.github = "Le lien GitHub est obligatoire.";
    if (technos.length === 0) newErrors.technos = "Vous devez sélectionner au moins une technologie.";
    if (etudiants.length === 0) newErrors.etudiants = "Vous devez sélectionner au moins un étudiant.";
    if (!categorie) newErrors.categorie = "La catégorie du projet est obligatoire.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFetcher.submit(event.target);
  };

  const technoOptions = technos.records.map((techno: TechnoResponse) => ({
    value: techno.id,
    label: techno.fields.Nom,
  }));

  const etudiantOptions = etudiants.records.map((etudiant: EtudiantResponse) => ({
    value: etudiant.id,
    label: etudiant.fields.Name,
  }));

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
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={projet.id} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="nom">Nom du projet</Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            defaultValue={projet.fields.Nom}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
          {errors.nom && <p className="text-red-600 text-sm">{errors.nom}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description du projet</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={projet.fields.Description}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="mots">Mot-clé du projet</Label>
          <Input
            id="mots"
            name="mots"
            type="text"
            defaultValue={projet.fields.Mots}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
          {errors.mots && <p className="text-red-600 text-sm">{errors.mots}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="github">Lien GitHub du projet</Label>
          <Input
            id="github"
            name="github"
            type="text"
            defaultValue={projet.fields.GitHub}
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
          {errors.github && <p className="text-red-600 text-sm">{errors.github}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="published">Publié</Label>
          <input type="checkbox" id="published" name="published" defaultChecked={projet.fields.Publié} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="categorie">Catégorie du projet</Label>
          <Select
            id="categorie"
            name="categorie"
            options={categories.records.map((categorie: CategoryResponse) => ({
              value: categorie.id,
              label: categorie.fields.Nom,
            }))}
            defaultValue={{
              value: projet.fields.Catégorie[0],
              label: categories.records.find((c: CategoryResponse) => c.id === projet.fields.Catégorie[0])?.fields.Nom,
            }}
            className="react-select-container"
          />
          {errors.categorie && <p className="text-red-600 text-sm">{errors.categorie}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="etudiants">Étudiants associés</Label>
          <Select
            id="etudiants"
            name="etudiants"
            isMulti
            options={etudiantOptions}
            defaultValue={etudiantOptions.filter(option => projet.fields.Étudiants.includes(option.value))}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {errors.etudiants && <p className="text-red-600 text-sm">{errors.etudiants}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="technos">Technologies utilisées</Label>
          <Select
            id="technos"
            name="technos"
            isMulti
            options={technoOptions}
            defaultValue={technoOptions.filter(option => projet.fields.Technos.includes(option.value))}
            className="react-select-container"
            classNamePrefix="react-select"
          />
          {errors.technos && <p className="text-red-600 text-sm">{errors.technos}</p>}
        </div>

        {busy ? (
          <Spinner />
        ) : (
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Modifier le projet
          </Button>
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
