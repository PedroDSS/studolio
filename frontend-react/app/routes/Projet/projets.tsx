import { Fragment } from "react/jsx-runtime";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/projets";
import { Button, Card } from "~/components";
import DeleteProjet, { clientAction } from "./deleteProjet";

export { clientAction };

export async function clientLoader() {
  return await (await fetch(`${import.meta.env.VITE_API_URL}/projets/`)).json();
}

export default function Projets({ loaderData }: Route.ComponentProps) {
  const { count, results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Ajouter un projet"
        label="Ajouter un projet"
        customStyle="self-end"
        onClick={() => (window.location.href = "/projets/create")}
      />
      <div className="flex flex-col items-center font-semibold">
        <h1 className="text-lg">Table - Projet</h1>
        <span className="text-gray-500 text-xs italic">
          {count} résultat(s)
        </span>
      </div>
      <div className="w-full flex flex-wrap justify-between mt-6">
        {results.map((result: APIResponse) => (
          <Card
            key={result.id}
            id={result.id}
            title={result.fields.Nom}
            desc={result.fields.Description}
            linkView={`/projets/${result.id}`}
            deleteButton={<DeleteProjet id={result.id} />}
            linkEdit={`/projets/update/${result.id}`}
          />
        ))}
      </div>
    </Fragment>
  );
}
