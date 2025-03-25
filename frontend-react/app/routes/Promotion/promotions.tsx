import { Fragment } from "react/jsx-runtime";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/promotions";
import { Button, Card } from "~/components";
import DeletePromotion, { clientAction } from "./deletePromotion";

export { clientAction };

export async function clientLoader() {
  return await (
    await fetch(`${import.meta.env.VITE_API_URL}/promotions/`)
  ).json();
}

export default function Promotions({ loaderData }: Route.ComponentProps) {
  const { count, results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Ajouter une promotion"
        label="Ajouter une promotion"
        customStyle="self-end"
        onClick={() => (window.location.href = "/promotions/create")}
      />
      <div className="flex flex-col items-center font-semibold">
        <h1 className="text-lg">Table - Promotion</h1>
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
            linkView={`/promotions/${result.id}`}
            deleteButton={<DeletePromotion id={result.id} />}
            linkEdit={`/promotions/update/${result.id}`}
          />
        ))}
      </div>
    </Fragment>
  );
}
