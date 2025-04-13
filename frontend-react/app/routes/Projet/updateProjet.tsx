import type { Route } from "./+types/updateProjet";
import { Fragment } from "react/jsx-runtime";
import { Button, Input, Spinner } from "~/components";
import { redirect, useFetcher } from "react-router";
import type APIResponse from "~/interfaces/APIResponse";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const projet: APIResponse = await (
    await fetch(`${import.meta.env.VITE_API_URL}/projets/${params.id}`)
  ).json();

  const { results: categories } = await (
    await fetch(`${import.meta.env.VITE_API_URL}/categories/`)
  ).json();

  const { results: technos } = await (
    await fetch(`${import.meta.env.VITE_API_URL}/technos/`)
  ).json();

  const { results: etudiants } = await (
    await fetch(`${import.meta.env.VITE_API_URL}/etudiants/`)
  ).json();
  return {
    projet,
    categories,
    technos,
    etudiants,
  };
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();

  if (formData.get("intent") === "update") {
    const technos = formData.getAll("technos");
    const etudiants = formData.getAll("etudiants");

    await fetch(
      `${import.meta.env.VITE_API_URL}/projets/${formData.get("id")}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Nom: formData.get("nom"),
          Description: formData.get("description"),
          "Mots-clés": formData.get("mot-clé"),
          GitHub: formData.get("github"),
          Publié: formData.get("publié"),
          Catégorie: [formData.get("categorie")],
          Technos: technos,
          Etudiants: etudiants,
        }),
      }
    );
    return redirect(`/projets/${formData.get("id")}`);
  }
}

export default function UpdatePromotion({ loaderData }: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { projet, categories, technos, etudiants } = loaderData;
  return (
    <Fragment>
      <Button
        ariaLabel="Retour"
        label="Retour à la liste"
        customStyle="self-start"
        onClick={() => (window.location.href = "/projets")}
      />
      <h1 className="font-semibold text-2xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
        Modification du projet
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col items-center gap-4"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={projet.id} />
        <Input
          ariaLabel="Nom du projet"
          id="nom"
          label="Nom du projet"
          name="nom"
          type="text"
          defaultValue={projet.fields.Nom}
        />
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="description">Description du projet</label>
          <textarea
            name="description"
            id="description"
            className="w-72 h-12 px-3 bg-white border-2 border-[#001205] rounded"
            defaultValue={projet.fields.Description}
          />
        </div>
        <Input
          ariaLabel="Mot-clé du projet"
          id="mot-clé"
          label="Mot-clé du projet"
          name="mot-clé"
          type="text"
          defaultValue={projet.fields["Mots-clés"]}
        />
        <Input
          ariaLabel="Lien GitHub du projet"
          id="github"
          label="Lien GitHub du projet"
          name="github"
          type="text"
          defaultValue={projet.fields.GitHub}
        />
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="description">Projet publié ?</label>
          <select
            name="publié"
            id="publié"
            className="w-72 h-12 px-3 bg-white border-2 border-[#001205] rounded"
            defaultValue={projet.fields["Publié"]}
          >
            <option value="False">Non</option>
            <option value="True">Oui</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="categorie">Catégorie du projet</label>
          <select
            name="categorie"
            id="categorie"
            className="w-72 h-12 px-3 bg-white border-2 border-[#001205] rounded"
            defaultValue={projet.fields.Catégorie[0]}
          >
            {categories.map((categorie: APIResponse) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="technos">Technologies utilisées</label>
          <select
            name="technos"
            id="technos"
            className="w-72 h-32 px-3 bg-white border-2 border-[#001205] rounded"
            multiple
            defaultValue={projet.fields.Technos}
          >
            {technos.map((techno: APIResponse) => (
              <option key={techno.id} value={techno.id}>
                {techno.fields.Nom}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2 font-medium text-black">
          <label htmlFor="etudiants">Étudiants impliqués</label>
          <select
            name="etudiants"
            id="etudiants"
            className="w-72 h-32 px-3 bg-white border-2 border-[#001205] rounded"
            multiple
            defaultValue={projet.fields.Étudiants}
          >
            {etudiants.map((etudiant: APIResponse) => (
              <option key={etudiant.id} value={etudiant.id}>
                {etudiant.fields.Nom} {etudiant.fields.Prenom}
              </option>
            ))}
          </select>
        </div>
        {busy ? (
          <Spinner />
        ) : (
          <Button
            ariaLabel="Modifier l'étudiant"
            label="Modifier"
            type="submit"
          />
        )}
      </updateFetcher.Form>
    </Fragment>
  );
}
