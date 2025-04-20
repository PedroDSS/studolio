import { redirect } from "react-router";
import { Spinner } from "~/components";

export async function clientLoader() {
  sessionStorage.removeItem("token");
  return redirect("/");
}

export default function logout() {
  return <Spinner />;
}
