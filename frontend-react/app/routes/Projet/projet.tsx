import type { Route } from "./+types/projet";
import DeleteProjet, { clientAction } from "./deleteProjet";
import clientLoader from "./getProjet";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Pencil, OpenEye } from "~/components";
import { Link } from "react-router";

export { clientAction, clientLoader };

export default function Projet({ loaderData }: Route.ComponentProps) {
  const { projet, technos, etudiants, projetCategorie, commentaires } =
    loaderData;

  return (
    <Fragment>
      <Button
        variant="outline"
        className="mb-4 self-start"
        onClick={() => (window.location.href = "/admin/projets")}
      >
        Retour à la liste
      </Button>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200 w-3xl flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {projet.fields.Nom}
          </h1>
          <p className="text-sm text-gray-500 mb-4">{projetCategorie}</p>
          <p className="text-gray-600 mb-4">{projet.fields.Description}</p>
          <p className="text-gray-500 text-xs italic mb-4">ID : {projet.id}</p>
          <div className="text-gray-600 space-y-2">
            <p>
              <strong>GitHub :</strong>{" "}
              <a
                href={projet.fields.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {projet.fields.GitHub}
              </a>
            </p>
            <p>
              <strong>Likes :</strong> {projet.fields.Likes}
            </p>
            <p>
              <strong>Publié :</strong>
              {projet.fields.Publié === "True" ? "Oui" : "Non"}
            </p>
            <p>
              <strong>Mots-clés :</strong> {projet.fields.Mots}
            </p>
            <p>
              <strong>Technos :</strong>
              {technos.length > 0 ? (
                <ul>
                  {technos.map((techno) => (
                    <li key={techno.id}>{techno.fields.Nom}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  Aucune techno associée à ce projet.
                </p>
              )}
            </p>
          </div>
          <div className="mt-6 flex gap-4">
            <Link
              to={`/admin/projets/update/${projet.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              <Pencil height={16} width={16} />
            </Link>
            <DeleteProjet id={projet.id} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Étudiants associés
          </h2>
          {etudiants.length > 0 ? (
            <ul className="space-y-4">
              {etudiants.map((etudiant) => (
                <li
                  key={etudiant.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow gap-4"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {etudiant.fields.Name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {etudiant.fields.Email}
                    </p>
                  </div>
                  <Link
                    to={`/admin/etudiants/${etudiant.id}`}
                    className="p-3 rounded bg-green-600 hover:bg-green-700 text-white"
                  >
                    <OpenEye height={20} width={20} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">Aucun étudiant associé à ce projet.</p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Commentaires
      </h2>
      <Button
        variant="outline"
        className="mb-4 self-start"
        onClick={() => (window.location.href = `/admin/projets/comment/${projet.id}`)}
      >
        Ajouter un commentaire
      </Button>
      {commentaires.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commentaires.map((commentaire) => (
            <div
              key={commentaire.id}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between"
            >
              <div>
                <p className="text-gray-800 text-lg mb-4">
                  {commentaire.fields.Notes}
                </p>
                <p className="text-sm text-gray-500">
                  Posté par : {commentaire.fields.AuthorName}
                </p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="bg-yellow-400 text-white rounded hover:bg-yellow-500"
                  onClick={() =>
                    (window.location.href = `/admin/projets/comment/edit/${projet.id}/${commentaire.id}`)
                  }
                >
                  <Pencil height={16} width={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun commentaire pour ce projet.</p>
      )}
    </Fragment>
  );
}
