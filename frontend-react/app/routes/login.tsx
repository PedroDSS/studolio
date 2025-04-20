import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/login";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components";
import { Button } from "~/components/ui/button";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (token) {
    return redirect("/dashboard");
  }
  return;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  if (formData.get("intent") === "login") {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Une erreur est survenue.");
    }
    const tokenResponse = await response.json();
    sessionStorage.setItem("token", tokenResponse.token);

    return redirect("/dashboard");
  }
}

export default function Login() {
  const loginFetcher = useFetcher<typeof clientAction>();
  let busy = loginFetcher.state !== "idle";
  return (
    <main className="flex fex-col justify-center items-center min-h-screen bg-gradient-to-b from-white to-green-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center h-60 w-60">
        <loginFetcher.Form method="post" className="flex flex-col gap-6">
          <input type="hidden" name="intent" value="login" />
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Entrez votre mail"
              className="border-gray-300 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Mot de passe
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              className="border-gray-300 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {busy ? (
            <Spinner />
          ) : (
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Connexion
            </Button>
          )}
        </loginFetcher.Form>
      </div>
    </main>
  );
}
