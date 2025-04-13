import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/projet";
import { Button, Card, Pencil } from "~/components";
import DeleteProjet, { clientAction } from "./deleteProjet";
import clientLoader from "./getProjet";
import { Link } from "react-router";

export { clientAction, clientLoader };

export default function Categorie({ loaderData }: Route.ComponentProps) {
  const { etudiants, projet, projetCategorie, technos } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/projets")}
      />
      <h1 className="text-2xl font-semibold">{projet.fields.Nom}</h1>
      <span className="font-light">{projetCategorie}</span>
      <span className="text-gray-500 text-xs italic ">{projet.id}</span>
      <p className="my-4">{projet.fields.Description}</p>
      <div className="flex gap-4 mt-4">
        <Link
          to={`/projets/update/${projet.id}`}
          className="p-2 bg-yellow-400 text-white rounded"
        >
          <Pencil height={16} width={16} />
        </Link>
        <DeleteProjet id={projet.id} />
      </div>
      <h2 className="self-start font-semibold text-xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852]">
        Technos associés
      </h2>
      {technos.length > 0 ? (
        <div className="w-full flex flex-wrap justify-between my-6">
          {technos.map((techno) => (
            <Card
              key={techno.id}
              id={techno.id}
              title={techno.fields.Nom}
              linkView={`/technos/${techno.id}`}
              desc={techno.fields.Description}
            />
          ))}
        </div>
      ) : (
        <span>Aucune techno associé à ce projet.</span>
      )}
      <h2 className="self-start font-semibold text-xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852]">
        Étudiants associés
      </h2>
      {etudiants.length > 0 ? (
        <div className="w-full flex flex-wrap justify-between mt-6">
          {etudiants.map((etudiant) => (
            <Card
              key={etudiant.id}
              id={etudiant.id}
              title={etudiant.fields.Name}
              linkView={`/etudiants/${etudiant.id}`}
            />
          ))}
        </div>
      ) : (
        <span>Aucun étudiant associé à ce projet.</span>
      )}
    </Fragment>
  );
}
