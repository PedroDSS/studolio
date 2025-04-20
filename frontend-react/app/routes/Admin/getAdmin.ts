import type { AdminResponse } from "~/interfaces/APIResponse";
import type { Route } from "./+types/admin";
import { redirect } from "react-router";

export default async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  let admin: AdminResponse;
  if (!token) {
    return redirect("/");
  }
  const responseAdmin = await fetch(
    `${import.meta.env.VITE_API_URL}/admins/${params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseAdmin.ok) {
    const errorData = await responseAdmin.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  admin = await responseAdmin.json();

  return { admin };
}
