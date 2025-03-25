import type { Route } from "./+types/dashboard";

export async function clientLoader() {
  const totalLikes = (
    await (await fetch(`${import.meta.env.VITE_API_URL}/dashboard/`)).json()
  )[0].fields;

  const totalProjets = (await (
    await fetch(`${import.meta.env.VITE_API_URL}/projets/`)
  ).json()).count;

  return { totalLikes, totalProjets };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { totalLikes, totalProjets } = loaderData;
  console.log(totalProjets);
  return (
    <h1 className="font-semibold text-3xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-4">
      Dashboard
    </h1>

    // les projets les plus populaires ici
    // les derniers commentaires
  );
}
