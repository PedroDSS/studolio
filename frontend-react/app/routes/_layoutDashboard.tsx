import { Fragment, type JSX } from "react";
import { Outlet } from "react-router";
import { Header } from "~/components";

const navLinks = [
  { link: "/dashboard", label: "Dashboard" },
  { link: "/admins", label: "Administrateurs" },
  { link: "/technos", label: "Technos" },
  { link: "/categories", label: "Catégories" },
  { link: "/promotions", label: "Promotions" },
  { link: "/etudiants", label: "Étudiants" },
  { link: "/projets", label: "Projets" },
];
export default function LayoutDashboard(): JSX.Element {
  return (
    <Fragment>
      <Header navLinks={navLinks} />
      <main className="flex fex-col justify-center min-h-screen bg-gradient-to-b from-white to-green-100 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full p-4 flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
}
