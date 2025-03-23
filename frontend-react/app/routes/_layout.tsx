import { Fragment, type JSX } from "react";
import { Outlet } from "react-router";
import Header from "~/components/Header";

export function HydrateFallback() {
  // Faire un sexy spinner 
  return <div>Loading...</div>;
}
export default function Layout(): JSX.Element {
  const navLinks = [{ link: "/technos", label: "Technos" }];

  return (
    <Fragment>
      <main className="p-2 flex flex-col min-h-screen bg-gradient-to-b from-white to-green-50">
        <Header navLinks={navLinks} />
        <Outlet />
      </main>
    </Fragment>
  );
}
