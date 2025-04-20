import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/projetComment";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Spinner } from "~/components";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
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

  return {
    projet: await responseProjet.json(),
  };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");

  if (formData.get("intent") === "createComment") {
    await fetch(`${import.meta.env.VITE_API_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Projet: [params.id],
        Notes: formData.get("notes"),
      }),
    });
    
    return redirect(`/projets/${params.id}`);
  }
}

export default function ProjetComment({ loaderData }: Route.ComponentProps) {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";
  const { projet } = loaderData;
  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = `/projets/${projet.id}`)}
      >
        Retour au projet {projet.fields.Nom}
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Ajouter un commentaire au projet {projet.fields.Nom}
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="createComment" />
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Votre commentaire
          </Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Entrez votre commentaire"
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
            Ajouter votre commentaire
          </Button>
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
