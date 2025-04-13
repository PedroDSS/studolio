import type { Route } from "./+types/updateEtudiant";
import { Fragment } from "react/jsx-runtime";
import { Button, Input, Spinner } from "~/components";
import { redirect, useFetcher } from "react-router";
import type APIResponse from "~/interfaces/APIResponse";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const etudiant: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/etudiants/${params.id}`)
  ).json();
  const { results } = await (
    await fetch(`${import.meta.env.VITE_API_URL}/promotions/`)
  ).json();
  return {
    etudiant: etudiant,
    promotions: results,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "update") {
    await fetch(
      `${import.meta.env.VITE_API_URL}/etudiants/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Prenom: formData.get("prenom"),
          Email: formData.get("email"),
          Promotion: [formData.get("promotion")],
        }),
      }
    );
    return redirect(`/etudiants/${formData.get("id")}`);
  }
}

export default function UpdatePromotion({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { etudiant, promotions } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/etudiants")}
      />
      <h1 className="font-semibold text-2xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
        Modification de l'étudiant
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={etudiant.id} />
        <Input
          ariaLabel="Nom de l'étudiant(e)"
          id="nom"
          label="Nom de l'étudiant(e)"
          name="nom"
          type="text"
          defaultValue={etudiant.fields.Nom}
        />
        <Input
          ariaLabel="Prénom de l'étudiant(e)"
          id="prenom"
          label="Prénom de l'étudiant(e)"
          name="prenom"
          type="text"
          defaultValue={etudiant.fields.Prenom}
        />
        <Input
          ariaLabel="Courriel de l'étudiant(e)"
          id="email"
          label="Courriel de l'étudiant(e)"
          name="email"
          type="email"
          defaultValue={etudiant.fields.Email}
        />
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="promotion">Promotion de l'étudiant(e)</label>
          <select
            name="promotion"
            id="promotion"
            className="w-72 h-12 px-3 bg-white border-2 border-[#001205] rounded"
            defaultValue={etudiant.fields.Promotion[0]}
          >
            {promotions.map((promotion: APIResponse) => (
              <option key={promotion.id} value={promotion.id}>
                {promotion.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        {busy ? (
          <Spinner />
        ) : (
          <Button
            ariaLabel="Modifier l'étudiant"
            label="Modifier"
            type="submit"
          />
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
