import { redirect } from "react-router";
import type { Route } from "./+types/dashboard";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
}
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return (
    <main className="p-6">
      <h1 className="font-semibold text-3xl after:content-[''] after:block after:w-full after:h-1 after:bg-[#32a852] mb-6">
        Dashboard
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
            <h2 className="text-lg font-medium text-gray-800">Card {item}</h2>
            <p className="text-sm text-gray-600 text-center">
              Ceci est un placeholder pour une carte.
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
