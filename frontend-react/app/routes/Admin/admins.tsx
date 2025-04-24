import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/admins";
import DeleteAdmin, { clientAction } from "./deleteAdmin";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import { Link, redirect } from "react-router";
import { OpenEye, Pencil } from "~/components";
import { Badge } from "~/components/ui/badge";
import type { AdminResponse } from "~/interfaces/APIResponse";

export { clientAction };

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/admins/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  return await response.json();
}

export default function Admins({ loaderData }: Route.ComponentProps) {
  const { count, records } = loaderData;
  return (
    <Fragment>
      <Button
        className="mt-4 mb-8"
        aria-label="Ajouter un administrateur"
        onClick={() => (window.location.href = "/admin/admins/create")}
      >
        Ajouter un administrateur
      </Button>

      <div className="flex flex-col items-center font-semibold mb-8">
        <Badge variant="secondary" className="text-sm">
          1 administrateur(s) trouvé(s)
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {records.map((record: AdminResponse) => (
          <Card
            key={record.id}
            className="shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl bg-white w-80"
          >
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {record.fields.Name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                ID: {record.id}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center w-full space-x-4 mt-6">
              <Link
                to={`/admin/admins/${record.id}`}
                className="p-3 rounded bg-green-600 hover:bg-green-700 text-white"
              >
                <OpenEye height={20} width={20} />
              </Link>
              <Link
                to={`/admin/admins/update/${record.id}`}
                className="p-3 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                <Pencil height={20} width={20} />
              </Link>
              <DeleteAdmin id={record.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </Fragment>
  );
}
