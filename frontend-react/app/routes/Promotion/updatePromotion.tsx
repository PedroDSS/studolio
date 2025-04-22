import type { Route } from "./+types/updatePromotion";
import { Fragment } from "react/jsx-runtime";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components";
import { redirect, useFetcher } from "react-router";
import type { PromoResponse } from "~/interfaces/APIResponse";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/promotions/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }
  const promotion: PromoResponse = await response.json();

  return { promotion };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "update") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/promotions/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur est survenue.");
    }
    return redirect(`/promotions/`);
  }
}

export default function UpdatePromotion({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { promotion } = loaderData;
  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/promotions")}
      >
        Retour à la liste
      </Button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modification de la promotion
      </h1>

      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={promotion.id} />

        <div className="flex flex-col gap-2">
          <Label htmlFor="nom" className="text-sm font-medium text-gray-700">
            Nouveau nom de la promotion
          </Label>
          <Input
            id="nom"
            name="nom"
            type="text"
            defaultValue={promotion.fields.Nom}
            placeholder="Entrez le nouveau nom"
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
            Modifier
          </Button>
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
