import { Fragment } from "react/jsx-runtime";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/technos";
import { Button, Card } from "~/components";
import DeleteTechno, { clientAction } from "./deleteTechno";

export { clientAction };

export async function clientLoader() {
  return await (await fetch(`${import.meta.env.VITE_API_URL}/technos/`)).json();
}

export default function Technos({ loaderData }: Route.ComponentProps) {
  const { count, results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Ajouter une techno"
        label="Ajouter une techno"
        customStyle="self-end"
        onClick={() => (window.location.href = "/technos/create")}
      />
      <div className="flex flex-col items-center font-semibold">
        <h1 className="text-lg">Table - Technos</h1>
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
            linkView={`/technos/${result.id}`}
            deleteButton={<DeleteTechno id={result.id} />}
            linkEdit={`/technos/update/${result.id}`}
          />
        ))}
      </div>
    </Fragment>
  );
}
