import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createAdmin";
import type { AdminResponse } from "~/interfaces/APIResponse";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "create") {
    const newAdmin: AdminResponse = await (
      await fetch(`${import.meta.env.VITE_API_URL}/admins/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Prenom: formData.get("prenom"),
          Email: formData.get("email"),
          Password: formData.get("password"),
        }),
      })
    ).json();
    return redirect(`/admins/${newAdmin.id}`);
  }
}

export default function CreateEtudiant() {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";

  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/admins")}
      >
        Retour à la liste
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Création d'un nouvel admin
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="create" />
        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nom de l'admin
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            placeholder="Entrez le nom de l'admin"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="prenom" className="text-sm font-medium text-gray-700">
            Prénom de l'admin
          </Label>
          <Input
            id="prenom"
            name="prenom"
            type="text"
            placeholder="Entrez le prénom de l'admin"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Courriel de l'admin
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Entrez le courriel de l'admin"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Mot de passe de l'admin
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Entrez le mot de passe de l'admin"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        {busy ? (
          <Spinner />
        ) : (
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Créer l'admin
          </Button>
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
