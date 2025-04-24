import type { Route } from "./+types/etudiant";
import { redirect, useFetcher } from "react-router";
import { Spinner } from "~/components";
import { Trash } from "~/components";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "delete") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/etudiants/${formData.get("id")}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur est survenue.");
    }

    return redirect("/admin/etudiants");
  }
}
export default function DeleteEtudiant({ id }: { id: string }) {
  const deleteFetcher = useFetcher<typeof clientAction>();
  let busy = deleteFetcher.state !== "idle";

  return busy ? (
    <Spinner />
  ) : (
    <deleteFetcher.Form method="post">
      <input type="hidden" name="intent" value="delete" />
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="p-3 bg-red-600 hover:bg-red-800 text-white rounded"
      >
        <Trash height={16} width={16} />
      </button>
    </deleteFetcher.Form>
  );
}
