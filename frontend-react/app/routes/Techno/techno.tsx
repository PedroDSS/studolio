import { Fragment } from "react/jsx-runtime";
import type { Route } from "./+types/techno";
import { Button, Card, Pencil } from "~/components";
import DeleteTechno, { clientAction } from "./deleteTechno";
import clientLoader from "./getTechno";
import { Link } from "react-router";

export { clientAction, clientLoader };

export default function Techno({ loaderData }: Route.ComponentProps) {
  const { techno, projects } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/technos")}
      />
      <h1 className="text-2xl font-semibold">{techno.fields.Nom}</h1>
      <span className="text-gray-500 text-xs italic ">{techno.id}</span>
      <div className="flex gap-4 mt-4">
        <Link
          to={`/technos/update/${techno.id}`}
          className="p-2 bg-yellow-400 text-white rounded"
        >
          <Pencil height={16} width={16} />
        </Link>
        <DeleteTechno id={techno.id} />
      </div>
      <h2 className="self-start font-semibold text-xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852]">
        Projets associés
      </h2>
      {projects.length > 0 ? (
        <div className="w-full flex flex-wrap justify-between mt-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              id={project.id}
              title={project.fields.Nom}
              linkView={`/projets/${project.id}`}
              desc={project.fields.Description}
            />
          ))}
        </div>
      ) : (
        <span>Aucun projet associé à cette technologie.</span>
      )}
    </Fragment>
  );
}
