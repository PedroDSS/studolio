import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createProjet";
import type APIResponse from "~/interfaces/APIResponse";
import { Fragment } from "react/jsx-runtime";
import { Button, Input, Spinner } from "~/components";
import { clientLoader } from "../Promotion/getPromotions";

export { clientLoader };
export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "create") {
    const newEtudiant: APIResponse = await (
      await fetch(`${import.meta.env.VITE_API_URL}/projets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Prenom: formData.get("prenom"),
          Email: formData.get("email"),
          Promotion: [formData.get("promotion")],
        }),
      })
    ).json();
    return redirect(`/projets/${newEtudiant.id}`);
  }
}

export default function CreateEtudiant({ loaderData }: Route.ComponentProps) {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";
  const { results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/projets")}
      />
      <h1 className="font-semibold text-2xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
        Création d'un(e) étudiant(e)
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <input type="hidden" name="intent" value="create" />
        <Input
          ariaLabel="Nom de l'étudiant(e)"
          id="nom"
          label="Nom de l'étudiant(e)"
          name="nom"
          type="text"
        />
        <Input
          ariaLabel="Prénom de l'étudiant(e)"
          id="prenom"
          label="Prénom de l'étudiant(e)"
          name="prenom"
          type="text"
        />
        <Input
          ariaLabel="Courriel de l'étudiant(e)"
          id="email"
          label="Courriel de l'étudiant(e)"
          name="email"
          type="email"
        />
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="promotion">Promotion de l'étudiant(e)</label>
          <select
            name="promotion"
            id="promotion"
            className="w-72 h-12 px-3 bg-white border-2 border-[#001205] rounded"
          >
            {results.map((result: APIResponse) => (
              <option value={result.id}>{result.fields.Nom}</option>
            ))}
          </select>
        </div>
        {busy ? (
          <Spinner />
        ) : (
          <Button ariaLabel="Créer l'étudiant(e)" label="Créer" type="submit" />
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
