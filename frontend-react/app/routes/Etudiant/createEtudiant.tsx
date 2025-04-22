import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createEtudiant";
import type { EtudiantResponse, PromoResponse } from "~/interfaces/APIResponse";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/promotions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  return await response.json();
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "create") {
    const newEtudiant: EtudiantResponse = await (
      await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/etudiants/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Prenom: formData.get("prenom"),
          Email: formData.get("email"),
          Promotion: [formData.get("promotion")],
        }),
      })
    ).json();
    return redirect(`/etudiants/${newEtudiant.id}`);
  }
}

export default function CreateEtudiant({ loaderData }: Route.ComponentProps) {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";
  const { records } = loaderData;

  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/etudiants")}
      >
        Retour à la liste
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Création d'un(e) nouvel(le) étudiant(e)
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="create" />
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nom de l'étudiant(e)
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            placeholder="Entrez le nom de l'étudiant(e)"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="prenom" className="text-sm font-medium text-gray-700">
            Prénom de l'étudiant(e)
          </Label>
          <Input
            id="prenom"
            name="prenom"
            type="text"
            placeholder="Entrez le prénom de l'étudiant(e)"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Courriel de l'étudiant(e)
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Entrez le courriel de l'étudiant(e)"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="promotion"
            className="text-sm font-medium text-gray-700"
          >
            Promotion de l'étudiant(e)
          </Label>
          <Select name="promotion">
            <SelectTrigger className="w-full h-12 px-3 bg-white border border-gray-300 rounded focus:ring-green-500 focus:border-green-500">
              <SelectValue placeholder="Promotion..." />
            </SelectTrigger>
            <SelectContent>
              {records.map((result: PromoResponse) => (
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
            Créer l'étudiant(e)
          </Button>
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
