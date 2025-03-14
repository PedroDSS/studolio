import type { Route } from "./+types/test";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  console.log(import.meta.env.VITE_API_URL);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/getAdmins`);
  const admins = await res.json();
  console.log(admins);
  return admins;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const admins = loaderData;
  return (
    <div>
      {admins.map((admin: any) => (
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
