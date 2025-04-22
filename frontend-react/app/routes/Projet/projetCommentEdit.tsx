import { redirect, useFetcher } from "react-router";
import type { Route } from "./+types/projetCommentEdit";
import { Fragment } from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Spinner } from "~/components";
import { Textarea } from "~/components/ui/textarea";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const responseComment = await fetch(
    `${import.meta.env.VITE_BACKEND_API_URL}/comments/${params.idComment}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!responseComment.ok) {
    const errorData = await responseComment.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  return {
    comment: await responseComment.json(),
    projetID: params.idProjet,
  };
}

export async function clientAction({
  request,
  params,
}: Route.ClientActionArgs) {
  let formData = await request.formData();
  const token = sessionStorage.getItem("token");
  if (formData.get("intent") === "updateComment") {
    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/comments/${params.idComment}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Notes: formData.get("notes"),
        }),
      }
    );
    return redirect(`/projets/${params.idProjet}`);
  }
  if (formData.get("intent") === "deleteComment") {
    await fetch(
      `${import.meta.env.VITE_BACKEND_API_URL}/comments/${params.idComment}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return redirect(`/projets/${params.idProjet}`);
  }
}

export default function ProjetCommentEdit({
  loaderData,
}: Route.ComponentProps) {
  const updateFetcher = useFetcher<typeof clientAction>();
  let busy = updateFetcher.state !== "idle";
  const { comment, projetID } = loaderData;
  return (
    <Fragment>
      <Button
        variant="outline"
        className="self-start mb-4"
        onClick={() => (window.location.href = `/projets/${projetID}`)}
      >
        Retour au projet
      </Button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Modification du commentaire
      </h1>
      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto"
      >
        <input type="hidden" name="intent" value="updateComment" />
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
            Votre commentaire
          </Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Entrez votre commentaire"
            className="border-gray-300 focus:ring-green-500 focus:border-green-500"
            defaultValue={comment.fields.Notes}
          />
        </div>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Modifier votre commentaire
        </Button>
      </updateFetcher.Form>
      <updateFetcher.Form
        method="post"
        className="flex flex-col gap-6 w-full max-w-lg mx-auto my-4"
      >
        <input type="hidden" name="intent" value="deleteComment" />

        <Button
          type="submit"
          className="bg-red-600 hover:bg-red-800 text-white"
        >
          Supprimer votre commentaire
        </Button>
      </updateFetcher.Form>

      {busy && <Spinner />}
    </Fragment>
  );
}
