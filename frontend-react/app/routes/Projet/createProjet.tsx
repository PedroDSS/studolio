import { redirect, useFetcher, useNavigate } from "react-router";
import type { Route } from "./+types/createProjet";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) return redirect("/");
  const [airtableCategories, airtableTechnos, airtableStudents] = await Promise.all([
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/categories/`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/technos/`, { headers: { Authorization: `Bearer ${token}` } }),
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/etudiants/`, { headers: { Authorization: `Bearer ${token}` } }),
  ]);
  if (!airtableCategories.ok || !airtableTechnos.ok || !airtableStudents.ok) {
    const err = (await (airtableCategories.ok ? airtableTechnos : airtableStudents).json()).detail;
    throw new Error(err || "Une erreur est survenue.");
  }
  return {
    categories: await airtableCategories.json(),
    technos: await airtableTechnos.json(),
    etudiants: await airtableStudents.json(),
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "create") {
    const technos = formData.getAll("technos") as string[];
    const etudiants = formData.getAll("etudiants") as string[];
    const categorie = formData.get("categorie") as string;
    const published = formData.has("published");
    const payload = {
      Nom: formData.get("nom") as string,
      Description: formData.get("description") as string,
      Mots: formData.get("mots") as string,
      GitHub: formData.get("github") as string,
      Catégorie: [categorie],
      Technos: technos,
      Étudiants: etudiants,
      Publié: published,
    };

    const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/projets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errData = await res.json();
      console.error("Erreur createProjet:", errData);
      throw new Error(errData.detail || "Erreur à la création du projet");
    }
    return redirect(`/admin/projets`);
  }
}

export default function CreateProjet({ loaderData }: Route.ComponentProps) {
  const fetcher = useFetcher<typeof clientAction>();
  const busy = fetcher.state !== "idle";
  const { categories, technos, etudiants } = loaderData;
  const navigate = useNavigate();

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

    fetcher.submit(event.target);
  };

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
        Création d'un nouveau projet
      </h1>

      <fetcher.Form
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="create" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="nom">Nom du projet</Label>
          <Input id="nom" name="nom" placeholder="Entrez le nom" />
          {errors.nom && <p className="text-red-600 text-sm">{errors.nom}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Entrez la description" />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="mots">Mot-clé</Label>
          <Input id="mots" name="mots" placeholder="Entrez un mot-clé" />
          {errors.mots && <p className="text-red-600 text-sm">{errors.mots}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="github">Lien GitHub</Label>
          <Input id="github" name="github" placeholder="Entrez le lien GitHub" />
          {errors.github && <p className="text-red-600 text-sm">{errors.github}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="etudiants">Étudiants associés</Label>
          <select
            id="etudiants"
            name="etudiants"
            multiple
            className="border rounded p-2"
          >
            {etudiants.records.map((e: EtudiantResponse) => (
              <option key={e.id} value={e.id}>
                {e.fields.Name}
              </option>
            ))}
          </select>
          {errors.etudiants && <p className="text-red-600 text-sm">{errors.etudiants}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="technos">Technologies utilisées</Label>
          <select
            id="technos"
            name="technos"
            multiple
            className="border rounded p-2"
          >
            {technos.records.map((t: TechnoResponse) => (
              <option key={t.id} value={t.id}>
                {t.fields.Nom}
              </option>
            ))}
          </select>
          {errors.technos && <p className="text-red-600 text-sm">{errors.technos}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="categorie">Catégorie du projet</Label>
          <Select name="categorie">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choisir une catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.records.map((c: CategoryResponse) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.fields.Nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categorie && <p className="text-red-600 text-sm">{errors.categorie}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="published">Publié</Label>
          <input type="checkbox" id="published" name="published" />
        </div>

        {busy ? (
          <Spinner />
        ) : (
          <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
            Créer le projet
          </Button>
        )}
      </fetcher.Form>
    </Fragment>
  );
}
