import { Fragment } from "react/jsx-runtime";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/categories";
import { Button, Card } from "~/components";
import DeleteCategorie, { clientAction } from "./deleteCategorie";

export { clientAction };

export async function clientLoader() {
  return await (
    await fetch(`${import.meta.env.VITE_API_URL}/categories/`)
  ).json();
}

export default function Categories({ loaderData }: Route.ComponentProps) {
  const { count, results } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Ajouter une catégorie"
        label="Ajouter une catégorie"
        customStyle="self-end"
        onClick={() => (window.location.href = "/categories/create")}
      />
      <div className="flex flex-col items-center font-semibold">
        <h1 className="text-lg">Table - Categorie</h1>
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
            linkView={`/categories/${result.id}`}
            deleteButton={<DeleteCategorie id={result.id} />}
            linkEdit={`/categories/update/${result.id}`}
          />
        ))}
      </div>
    </Fragment>
  );
}
