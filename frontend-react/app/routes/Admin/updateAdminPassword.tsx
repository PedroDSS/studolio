import type { Route } from "./+types/updateAdminPassword";
import { redirect, useFetcher } from "react-router";
import { Spinner } from "~/components";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { AdminResponse } from "~/interfaces/APIResponse";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  let admin: AdminResponse;
  if (!token) {
    return redirect("/");
  }
  const responseAdmin = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/admins/${params.id}`,
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

  admin = await responseAdmin.json();

  return { admin };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "updatePassword") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/admins/password/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Password: formData.get("password"),
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur est survenue.");
    }

    return redirect(`/admins/${formData.get("id")}`);
  }
}

export default function UpdateAdminPassword({
  loaderData,
}: Route.ComponentProps) {
  const updatePassword = useFetcher<typeof clientAction>();
  let busy = updatePassword.state !== "idle";
  const { admin } = loaderData;
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Modifier le mot de passe
      </h1>
      <p className="text-gray-600 mb-6">
        Entrez un nouveau mot de passe pour l'administrateur.
      </p>
      <updatePassword.Form method="post" className="flex flex-col gap-6">
        <input type="hidden" name="intent" value="updatePassword" />
        <input type="hidden" name="id" value={admin.id} />
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Nouveau mot de passe
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Entrez le nouveau mot de passe"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        {busy ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white w-full"
          >
            Modifier le mot de passe
          </Button>
        )}
      </updatePassword.Form>
    </>
  );
}
