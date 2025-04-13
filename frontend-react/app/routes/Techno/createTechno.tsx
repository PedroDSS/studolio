import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/createTechno";
import type APIResponse from "~/interfaces/APIResponse";
import { Fragment } from "react/jsx-runtime";
import { Button, Input, Spinner } from "~/components";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "create") {
    const newTechno: APIResponse = await (
      await fetch(`${import.meta.env.VITE_API_URL}/technos/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
        }),
      })
    ).json();
    return redirect(`/technos/${newTechno.id}`);
  }
}

export default function CreateTechno() {
  const createFetcher = useFetcher<typeof clientAction>();
  let busy = createFetcher.state !== "idle";
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/technos")}
      />
      <h1 className="font-semibold text-2xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
        Création d'une nouvelle techno
      </h1>
      <createFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <input type="hidden" name="intent" value="create" />
        <Input
          ariaLabel="Nom de la techno"
          id="nom"
          label="Nom de la techno"
          name="nom"
          type="text"
        />
        {busy ? (
          <Spinner />
        ) : (
          <Button ariaLabel="Créer la techno" label="Créer" type="submit" />
        )}
      </createFetcher.Form>
    </Fragment>
  );
}
