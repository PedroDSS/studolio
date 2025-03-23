import { Fragment } from "react/jsx-runtime";
import Button from "~/components/Button";
import Card from "~/components/Card";

export async function clientLoader() {
  const technos = (
    await fetch(`${import.meta.env.VITE_API_URL}/technos/`)
  ).json();
  console.log(technos);
  return technos;
}
export default function Test() {
  return (
    <Fragment>
      <div className="p-5 flex items-center gap-2">
        <Button ariaLabel="button" label="button" />
        <Card id="1" link="oui" title="title" />
      </div>
    </Fragment>
  );
}

// import type { Route } from "./+types/test";
// import type Admin from "interfaces/admin";

// export async function clientLoader({ params }: Route.ClientLoaderArgs) {
//   const admins = (
//     await fetch(`${import.meta.env.VITE_API_URL}/admins/`)
//   ).json();
//   return admins;
// }

// export function HydrateFallback() {
//   return <div>Loading...</div>;
// }

// export default function Product({ loaderData }: Route.ComponentProps) {
//   const admins = loaderData();
//   return (
//     <div>
//       {admins.map((admin: Admin) => (
//         <div key={admin.id}>
//           <h2>{admin.fields.Name}</h2>
//           <p>Nom: {admin.fields.Nom}</p>
//           <p>Prénom: {admin.fields.Prenom}</p>
//           <p>Email: {admin.fields.Email}</p>
//           <p>Mot de passe: {admin.fields["Mot de passe"]}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
