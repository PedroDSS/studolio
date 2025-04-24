import type { Route } from "./+types/updateEtudiant";
import { Fragment } from "react/jsx-runtime";
import { redirect, useFetcher } from "react-router";
import type { EtudiantResponse, PromoResponse } from "~/interfaces/APIResponse";
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

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const responsePromotion = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/promotions/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const responseEtudiant = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/etudiants/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responsePromotion.ok) {
    const errorData = await responsePromotion.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }
  if (!responseEtudiant.ok) {
    const errorData = await responseEtudiant.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }
  const etudiant: EtudiantResponse = await responseEtudiant.json();
  const promotions = await responsePromotion.json();
  const { records } = promotions;
  return {
    etudiant: etudiant,
    promotions: records,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "update") {
    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/etudiants/${formData.get("id")}`,
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
    return redirect(`/admin/etudiants/${formData.get("id")}`);
  }
}

export default function UpdatePromotion({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { etudiant, promotions } = loaderData;
  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = "/admin/etudiants")}
      >
        Retour à la liste
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modification d'un(e) étudiant(e)
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={etudiant.id} />
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
            defaultValue={etudiant.fields.Nom}
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
            defaultValue={etudiant.fields.Prenom}
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
            defaultValue={etudiant.fields.Email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="promotion"
            className="text-sm font-medium text-gray-700"
          >
            Promotion de l'étudiant(e)
          </Label>
          <Select
            name="promotion"
            defaultValue={etudiant.fields.Promotion?.[0] ?? undefined}
          >
            <SelectTrigger className="w-full h-12 px-3 bg-white border border-gray-300 rounded focus:ring-green-500 focus:border-green-500">
              <SelectValue placeholder="Promotion..." />
            </SelectTrigger>
            <SelectContent>
              {promotions.map((result: PromoResponse) => (
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
            Modifier
          </Button>
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
