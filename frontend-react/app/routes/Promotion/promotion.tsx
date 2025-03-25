import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/promotion";
import { Button, Card, Pencil } from "~/components";
import DeleteTechno, { clientAction } from "./deletePromotion";
import clientLoader from "./getPromotion";
import { Link } from "react-router";

export { clientAction, clientLoader };

export default function Promotion({ loaderData }: Route.ComponentProps) {
  const { promotion, etudiants } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/promotions")}
      />
      <h1 className="text-2xl font-semibold">{promotion.fields.Nom}</h1>
      <span className="text-gray-500 text-xs italic ">{promotion.id}</span>
      <div className="flex gap-4 mt-4">
        <Link
          to={`/promotions/update/${promotion.id}`}
          className="p-2 bg-yellow-400 text-white rounded"
        >
          <Pencil height={16} width={16} />
        </Link>
        <DeleteTechno id={promotion.id} />
      </div>
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
        <span>Aucun étudiant associé à cette promotion.</span>
      )}
    </Fragment>
  );
}
