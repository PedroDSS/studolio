import { Fragment, type JSX } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "~/components";

const navLinks = [
  { link: "/admin/dashboard", label: "Dashboard" },
  { link: "/admin/admins", label: "Administrateurs" },
  { link: "/admin/technos", label: "Technos" },
  { link: "/admin/categories", label: "Catégories" },
  { link: "/admin/promotions", label: "Promotions" },
  { link: "/admin/etudiants", label: "Étudiants" },
  { link: "/admin/projets", label: "Projets" },
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
