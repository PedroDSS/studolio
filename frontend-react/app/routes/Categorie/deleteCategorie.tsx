import type { Route } from "./+types/categorie";
import { useFetcher } from "react-router";
import { Spinner } from "~/components";
import { Trash } from "~/components";
import { redirect } from "react-router";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "delete") {
    await fetch(
      `${import.meta.env.VITE_API_URL}/categories/${formData.get("id")}`,
      {
        method: "DELETE",
      }
    );
    return redirect("/categories");
  }
}

export default function DeleteCategorie({ id }: { id: string }) {
  const deleteFetcher = useFetcher<typeof clientAction>();
  let busy = deleteFetcher.state !== "idle";

  return busy ? (
    <Spinner />
  ) : (
    <deleteFetcher.Form method="post">
      <input type="hidden" name="intent" value="delete" />
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="p-2 bg-red-600 text-white rounded">
        <Trash height={16} width={16} />
      </button>
    </deleteFetcher.Form>
  );
}
