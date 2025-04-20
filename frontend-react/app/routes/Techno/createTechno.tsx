import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createTechno";
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
    const response = await fetch(`${import.meta.env.VITE_API_URL}/technos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Nom: formData.get("nom"),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur est survenue.");
    }
    return redirect(`/technos`);
  }
}

export default function CreateTechno() {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";

  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/technos")}
      >
        Retour à la liste
      </Button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Création d'une nouvelle technologie
      </h1>

      <createFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="create" />

        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nom de la technologie
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            placeholder="Entrez le nom de la technologie"
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
            Créer la technologie
          </Button>
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
