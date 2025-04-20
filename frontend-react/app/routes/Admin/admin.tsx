import clientLoader from "./getAdmin";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Pencil } from "~/components";
import { Link } from "react-router";
import type { Route } from "./+types/admin";
import DeleteAdmin, { clientAction } from "./deleteAdmin";

export { clientLoader, clientAction };

export default function Admin({ loaderData }: Route.ComponentProps) {
  const { admin } = loaderData;

  return (
    <Fragment>
      <Button
        variant="outline"
        className="mb-4 self-start"
        onClick={() => (window.location.href = "/admins")}
      >
        Retour à la liste
      </Button>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            {admin.fields.Name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {admin.fields.Name}
            </h1>
            <p className="text-sm text-gray-500">Administrateur</p>
          </div>
        </div>

        <div className="text-gray-600 space-y-2">
          <p>
            <strong>Email :</strong> {admin.fields.Email}
          </p>
          <p>
            <strong>ID :</strong> {admin.id}
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <Link
            to={`/admins/update/${admin.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
          >
            <Pencil height={16} width={16} />
            Modifier
          </Link>
          <Link
            to={`/admins/update/password/${admin.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Pencil height={16} width={16} />
            Modifier le mot de passe
          </Link>

          <DeleteAdmin id={admin.id} />
        </div>
      </div>
    </Fragment>
  );
}
