import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Modal } from "~/components/ui/modal";
import type { ProjetResponse } from "~/interfaces/APIResponse";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Spinner } from "~/components";
import { useNavigate } from "react-router";

export default function Projets() {
  const [data, setData] = useState<{ records: ProjetResponse[]; offset?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [offsetStack, setOffsetStack] = useState<string[]>([]);
  const [currentOffset, setCurrentOffset] = useState<string | null>(null);
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentOffset(null);
      setOffsetStack([]);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchProjets = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Error");
      }

      const params = new URLSearchParams();
      params.append("limit", limit.toString());
      if (currentOffset) params.append("offset", currentOffset);
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/projets?${params.toString()}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);
      setData(await res.json());
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjets();
  }, [debouncedSearchTerm, currentOffset]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleNext = () => {
    if (data?.offset) {
      setOffsetStack((prev) => [...prev, data.offset!]);
      setCurrentOffset(data.offset);
    }
  };

  const handlePrev = () => {
    if (offsetStack.length > 1) {
      const copy = [...offsetStack];
      copy.pop();
      setOffsetStack(copy);
      setCurrentOffset(copy[copy.length - 1] || null);
    } else {
      setOffsetStack([]);
      setCurrentOffset(null);
    }
  };

  const openModal = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToDelete(null);
  };

  const handleDelete = async () => {
    if (projectToDelete) {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("Erreur d'authentification");
        }

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/projets/${projectToDelete}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Erreur de suppression : ${res.status}`);
        }

        setData((prevData) => ({
          records: prevData?.records.filter((p) => p.id !== projectToDelete) || [],
          offset: prevData?.offset || "",
        }));

        closeModal();
      } catch (err: any) {
        setError(err.message || "Erreur inconnue lors de la suppression");
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-600">
        <p>Erreur : {error}</p>
        <Button variant="outline" onClick={fetchProjets} className="mt-4">
          Réessayer
        </Button>
      </div>
    );
  if (!data) return null;

  return (
    <Fragment>
      <div className="flex flex-col items-center mb-8 px-4">
        <Button
          className="mt-4 mb-8"
          aria-label="Ajouter une techno"
          onClick={() => navigate("/admin/projets/create")}
        >
          Ajouter un projet
        </Button>
        <Badge className="mb-4">
          {data.records.length} projet{data.records.length > 1 ? "s" : ""} trouvé
          {data.records.length > 1 ? "s" : ""}
        </Badge>
        <Input
          placeholder="Rechercher un projet…"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md"
        />
      </div>

      <div className="px-6 sm:px-10 md:px-20">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.records.length > 0 ? (
            data.records.map((p) => (
              <Card
                key={p.id}
                className="border border-gray-200 hover:shadow-xl transition p-8 rounded-2xl bg-white flex flex-col"
              >
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-lg font-bold">{p.fields.Nom}</CardTitle>
                  {p.fields.Description && (
                    <CardDescription className="text-gray-500 text-sm">
                      {p.fields.Description}
                    </CardDescription>
                  )}
                </CardHeader>

                {p.fields.TechnosNames?.length > 0 && (
                  <div className="mt-4">
                    <span className="block text-xs font-semibold text-gray-700 mb-1 text-center">
                      Technos
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.fields.TechnosNames.map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {p.fields.ÉtudiantsNames?.length > 0 && (
                  <div className="mt-4">
                    <span className="block text-xs font-semibold text-gray-700 mb-1 text-center">
                      Étudiants
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {p.fields.ÉtudiantsNames.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <CardFooter className="flex flex-col items-center mt-auto space-y-2">
                  <Link
                    to={`/admin/projets/${p.id}`}
                    className="w-full text-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Voir le projet
                  </Link>

                  <Link
                    to={`/admin/projets/update/${p.id}`}
                    className="w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
                  >
                    Modifier
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => openModal(p.id)}
                    className="w-full text-center px-4 py-2 text-red-600 border border-red-600 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Supprimer
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">Aucun projet trouvé.</p>
          )}
        </div>
      </div>


      <div className="flex justify-center items-center gap-4 mt-10">
        <Button variant="outline" onClick={handlePrev} disabled={offsetStack.length === 0}>
          Précédent
        </Button>
        <Button variant="outline" onClick={handleNext} disabled={!data.offset}>
          Suivant
        </Button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Êtes-vous sûr de vouloir supprimer ce projet ?</h3>
            <p className="text-sm mb-6">Cette action est irréversible.</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={closeModal} className="px-6 py-2">
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
}
