import { Fragment } from "react/jsx-runtime";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/etudiants";
import { Button, Card } from "~/components";
import DeleteEtudiant, { clientAction } from "./deleteEtudiant";

export { clientAction };

export async function clientLoader() {
  return await (
    await fetch(`${import.meta.env.VITE_API_URL}/etudiants/`)
  ).json();
}

export default function Etudiants({ loaderData }: Route.ComponentProps) {
  const { count, results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Ajouter un(e) étudiant(e)"
        label="Ajouter un(e) étudiant(e)"
        customStyle="self-end"
        onClick={() => (window.location.href = "/etudiants/create")}
      />
      <div className="flex flex-col items-center font-semibold">
        <h1 className="text-lg">Table - Étudiant</h1>
        <span className="text-gray-500 text-xs italic">
          {count} résultat(s)
        </span>
      </div>
      <div className="w-full flex flex-wrap justify-between mt-6">
        {results.map((result: APIResponse) => (
          <Card
            key={result.id}
            id={result.id}
            title={result.fields.Name}
            linkView={`/etudiants/${result.id}`}
            deleteButton={<DeleteEtudiant id={result.id} />}
            linkEdit={`/etudiants/update/${result.id}`}
          />
        ))}
      </div>
    </Fragment>
  );
}
