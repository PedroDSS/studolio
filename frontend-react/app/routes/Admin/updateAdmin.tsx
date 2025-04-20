import type { Route } from "./+types/updateAdmin";
import { Fragment } from "react/jsx-runtime";
import { redirect, useFetcher } from "react-router";
import type { AdminResponse } from "~/interfaces/APIResponse";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const responseAdmin = await fetch(
    `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseAdmin.ok) {
    const errorData = await responseAdmin.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }
  const admin: AdminResponse = await responseAdmin.json();
  return {
    admin,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "update") {
    await fetch(
      `${import.meta.env.VITE_API_URL}/admins/${formData.get("id")}`,
      {
        method: "PATCH",
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
      }
    );
    return redirect(`/admins/${formData.get("id")}`);
  }
}

export default function UpdatePromotion({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { admin } = loaderData;
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
        Modification d'un admin
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={admin.id} />
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
            defaultValue={admin.fields.Nom}
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
            defaultValue={admin.fields.Prenom}
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
            defaultValue={admin.fields.Email}
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
