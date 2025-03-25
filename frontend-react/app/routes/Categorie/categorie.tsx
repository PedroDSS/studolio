import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/categorie";
import { Button, Card, Pencil } from "~/components";
import DeleteCategorie, { clientAction } from "./deleteCategorie";
import clientLoader from "./getCategorie";
import { Link } from "react-router";

export { clientAction, clientLoader };

export default function Categorie({ loaderData }: Route.ComponentProps) {
  const { categorie, projects } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/categories")}
      />
      <h1 className="text-2xl font-semibold">{categorie.fields.Nom}</h1>
      <span className="text-gray-500 text-xs italic ">{categorie.id}</span>
      <div className="flex gap-4 mt-4">
        <Link
          to={`/categories/update/${categorie.id}`}
          className="p-2 bg-yellow-400 text-white rounded"
        >
          <Pencil height={16} width={16} />
        </Link>
        <DeleteCategorie id={categorie.id} />
      </div>
      <h2 className="self-start font-semibold text-xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852]">
        Projets associés
      </h2>
      {projects.length > 0 ? (
        <div className="w-full flex flex-wrap justify-between mt-6">
          {projects.map((projet) => (
            <Card
              key={projet.id}
              id={projet.id}
              title={projet.fields.Nom}
              linkView={`/projets/${projet.id}`}
              desc={projet.fields.Description}
            />
          ))}
        </div>
      ) : (
        <span>Aucun projet associé à cette catégorie.</span>
      )}
    </Fragment>
  );
}
