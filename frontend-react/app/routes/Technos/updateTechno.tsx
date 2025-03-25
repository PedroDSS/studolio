import clientLoader from "./getTechno";
import type { Route } from "./+types/updateTechno";
import { Fragment } from "react/jsx-runtime";
import { Button, Input, Spinner } from "~/components";
import { redirect, useFetcher } from "react-router";

export { clientLoader };

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "update") {
    await fetch(
      `${import.meta.env.VITE_API_URL}/technos/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
        }),
      }
    );
    return redirect(`/technos/${formData.get("id")}`);
  }
}

export default function UpdateTechno({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { techno } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/technos")}
      />
      <h1 className="font-semibold text-2xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
        Modification de la techno
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={techno.id} />
        <Input
          ariaLabel="Nouveau nom de la techno"
          id="nom"
          label="Nouveau nom"
          name="nom"
          type="text"
          defaultValue={techno.fields.Nom}
        />
        {busy ? (
          <Spinner />
        ) : (
          <Button
            ariaLabel="Modifier la techno"
            label="Modifier"
            type="submit"
          />
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
