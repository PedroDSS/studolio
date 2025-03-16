import type { Route } from "./+types/test";
import type Admin from "interfaces/admin";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const admins = (
    await fetch(`${import.meta.env.VITE_API_URL}/getAdmins`)
  ).json();
  return admins;
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const admins = loaderData;
  return (
    <div>
      {admins.map((admin: Admin) => (
        <div key={admin.id}>
          <h2>{admin.fields.Name}</h2>
          <p>Nom: {admin.fields.Nom}</p>
          <p>Prénom: {admin.fields.Prenom}</p>
          <p>Email: {admin.fields.Email}</p>
          <p>Mot de passe: {admin.fields["Mot de passe"]}</p>
        </div>
      ))}
    </div>
  );
}
