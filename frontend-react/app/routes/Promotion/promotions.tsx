import { Fragment, useState } from "react";
import type { Route } from "./+types/promotions";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "~/components/ui/card";
import { Link, redirect } from "react-router";
import { Badge } from "~/components/ui/badge";
import type { PromoResponse } from "~/interfaces/APIResponse";

export async function clientLoader() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/");
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/promotions/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Une erreur est survenue.");
  }

  return await response.json();
}

export default function Promotions({ loaderData }: Route.ComponentProps) {
  const { records } = loaderData;
  const [modalOpen, setModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);

  const openModal = (id: string) => {
    setToDelete(id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!toDelete) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/promotions/${toDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (!res.ok) throw new Error("Échec de la suppression");

      window.location.reload();
    } catch (err) {
      console.error("Erreur lors de la suppression de la promotion:", err);
      closeModal();
    }
  };

  return (
    <Fragment>
      <Button
        className="mt-4 mb-8"
        aria-label="Ajouter une promotion"
        onClick={() => (window.location.href = "/admin/promotions/create")}
      >
        Ajouter une promotion
      </Button>

      <div className="flex flex-col items-center font-semibold mb-8">
        <Badge variant="secondary" className="text-sm">
          {records.length} promotion{records.length > 1 ? "s" : ""} trouvée
          {records.length > 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {records.map((record: PromoResponse) => (
          <Card
            key={record.id}
            className="shadow-lg hover:shadow-xl transition-shadow p-6 rounded-xl bg-white w-80 flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">
                {record.fields.Nom}
              </CardTitle>
            </CardHeader>

            <CardFooter className="flex flex-col items-center mt-auto space-y-2">
              <Link
                to={`/admin/promotions/update/${record.id}`}
                className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Modifier
              </Link>

              <Button
                variant="outline"
                onClick={() => openModal(record.id)}
                className="w-full text-center px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors"
              >
                Supprimer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirmer la suppression
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Voulez-vous vraiment supprimer cette promotion&nbsp;? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>
                Annuler
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={handleConfirmDelete}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
