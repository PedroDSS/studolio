import { redirect } from "react-router";
import type { Route } from "./+types/dashboard";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Impossible de récupérer les données du tableau de bord.");
  }
  return await response.json();
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
  const { fields } = loaderData;
  const totalProjects = fields.TotalProjets || 0;
  const totalPublished = fields.TotalPubliés || 0;
  const totalUnpublished = fields.TotalNonPubliés || 0;
  const totalLikes = fields.TotalLikes || 0;
  const totalCategories = fields.TotalCatégories || {};
  const totalTechnos = fields.TotalTechnos || {};

  const categoriesData = {
    labels: Object.keys(totalCategories),
    datasets: [
      {
        data: Object.values(totalCategories),
        backgroundColor: ["#34D399", "#60A5FA", "#FBBF24", "#F87171", "#A78BFA"],
        hoverOffset: 6,
      },
    ],
  };

  const technosData = {
    labels: Object.keys(totalTechnos),
    datasets: [
      {
        label: "Projets utilisant cette technologie",
        data: Object.values(totalTechnos),
        backgroundColor: "#60A5FA",
      },
    ],
  };

  return (
    <>
      <main className="p-6 space-y-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tableau de bord
          <div className="h-1 w-32 bg-green-600 mt-2 rounded" />
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full mb-4 text-2xl font-bold">
              📚
            </div>
            <h2 className="text-lg font-medium text-gray-800">Projets</h2>
            <p className="text-2xl font-bold text-gray-900">{totalProjects}</p>
            <p className="text-sm text-gray-500 mt-2">
              Dont <span className="text-green-700">{totalPublished} publiés</span> / <span className="text-red-700">{totalUnpublished} non publiés</span>
            </p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-pink-100 text-pink-600 flex items-center justify-center rounded-full mb-4 text-2xl font-bold">
              ❤️
            </div>
            <h2 className="text-lg font-medium text-gray-800">Total Likes</h2>
            <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
            <p className="text-sm text-gray-500 mt-2">Likes sur tous les projets</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-700 mb-3">Répartition des catégories</h3>
            <div className="h-64">
              <Pie data={categoriesData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-base font-semibold text-gray-700 mb-3">Top technologies</h3>
            <div className="h-64">
              <Bar data={technosData} options={{ maintainAspectRatio: false, indexAxis: 'y' }} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
