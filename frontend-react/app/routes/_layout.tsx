import { Fragment, type JSX } from "react";
import { Outlet } from "react-router";
import { Header, Spinner, Logo } from "~/components";

export function HydrateFallback() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col gap-4 justify-center items-center">
      <Logo height={240} width={240} color="#125724" />
      <Spinner width="64px" height="64px" border="8px" />
    </div>
  );
}

export default function Layout(): JSX.Element {
  return (
    <Fragment>
      <Header />
      <main className="flex fex-col justify-center min-h-screen bg-gradient-to-b from-white to-green-100 p-4">
        <div className="bg-white rounded-lg shadow-lg w-full p-4 flex flex-col items-center">
          <Outlet />
        </div>
      </main>
    </Fragment>
  );
}
