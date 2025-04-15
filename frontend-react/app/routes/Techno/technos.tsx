import { Fragment } from "react";
import type APIResponse from "~/interfaces/APIResponse";
import type { Route } from "./+types/technos";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "~/components/ui/card";
import DeleteTechno, { clientAction } from "./deleteTechno";
import { Link } from "react-router";
import { Pencil } from "~/components";
import { Badge } from "~/components/ui/badge";

export { clientAction };

export async function clientLoader() {
  return await (await fetch(`${import.meta.env.VITE_API_URL}/technos/`)).json();
}

export default function Technos({ loaderData }: Route.ComponentProps) {
  const { count, records } = loaderData;

  return (
    <Fragment>
      {/* Header Section */}
        <Button
          className="mt-4 mb-8"
          aria-label="Ajouter une techno"
          onClick={() => (window.location.href = "/technos/create")}
        >
          Ajouter une technologie
        </Button>

      <div className="flex flex-col items-center font-semibold mb-8">
        <Badge variant="secondary" className="text-sm">
          {count} technologie(s) trouvée(s)
        </Badge>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {records.map((record: APIResponse) => (
          <Card
            key={record.id}
            className="shadow-lg hover:shadow-xl transition-shadow p-8 rounded-lg"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {record.fields.Nom}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500">
                ID: {record.id}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center w-full space-x-4">
              <Link
                to={`/technos/update/${record.id}`}
                className="p-3 bg-yellow-400 text-white rounded hover:bg-yellow-500"
              >
                <Pencil height={20} width={20} />
              </Link>
              <DeleteTechno id={record.id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </Fragment>
  );
}
