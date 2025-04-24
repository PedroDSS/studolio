import clientLoader from "./getEtudiant";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { OpenEye, Pencil } from "~/components";
import { Link } from "react-router";
import type { Route } from "./+types/etudiant";
import DeleteEtudiant, { clientAction } from "./deleteEtudiant";

export { clientLoader, clientAction };

export default function Etudiant({ loaderData }: Route.ComponentProps) {
  const { etudiant, projets, currentPromotion } = loaderData;

  return (
    <Fragment>
      <Button
        variant="outline"
        className="mb-4 self-start"
        onClick={() => (window.location.href = "/admin/etudiants")}
      >
        Retour à la liste
      </Button>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            {etudiant.fields.Name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {etudiant.fields.Name}
            </h1>
            <p className="text-sm text-gray-500">Étudiant</p>
          </div>
        </div>

        <div className="text-gray-600 space-y-2">
          <p>
            <strong>Email :</strong> {etudiant.fields.Email}
          </p>
          <p>
            <strong>Promotion :</strong>{" "}
            {currentPromotion || "Aucune promotion associée"}
          </p>
          <p>
            <strong>ID :</strong> {etudiant.id}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            to={`/admin/etudiants/update/${etudiant.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            <Pencil height={16} width={16} />
          </Link>
          <DeleteEtudiant id={etudiant.id} />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Projets associés
      </h2>
      {projets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projets.map((projet) => (
            <Card
              key={projet.id}
              className="shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl bg-white"
            >
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {projet.fields.Nom}
                </CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  ID: {projet.id}
                </CardDescription>
              </CardHeader>
              <div className="mt-4 text-gray-600">
                <p>
                  <strong>Description :</strong>{" "}
                  {projet.fields.Description ||
                    "Aucune description disponible."}
                </p>
              </div>
              <CardFooter className="flex justify-between items-center w-full space-x-4 mt-6">
                <Link
                  to={`/admin/projets/${projet.id}`}
                  className="p-3 rounded bg-green-600 hover:bg-green-700 text-white"
                >
                  <OpenEye height={20} width={20} />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aucun projet associé à cet étudiant.</p>
      )}
    </Fragment>
  );
}
