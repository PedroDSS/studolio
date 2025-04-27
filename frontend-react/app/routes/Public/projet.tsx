import { Fragment, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components";

type Projet = {
    id: string;
    fields: {
        Nom: string;
        Description?: string;
        GitHub?: string;
        Likes?: number;
        Publié?: string;
        Mots?: string;
        TechnosNames?: string[];
        ÉtudiantsNames?: string[];
        Visuel?: Array<{
            id: string;
            url: string;
            filename: string;
        }> | null;
    };
};

export default function Projet() {
    const { id } = useParams();
    const [projet, setProjet] = useState<Projet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
        if (id && likedProjects.includes(id)) {
            setHasLiked(true);
        }
    }, [id]);

    useEffect(() => {
        const fetchProjet = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/projets/${id}`);
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.detail || "Erreur lors du chargement du projet.");
                }
                const data = await res.json();
                setProjet(data);
            } catch (err: any) {
                setError(err.message || "Une erreur est survenue.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjet();
    }, [id]);

    const handleLikeToggle = async () => {
        if (!id || !projet) return;

        const action = hasLiked ? "dislike" : "like";

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/projets/${id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ action }),
            });

            if (!res.ok) {
                throw new Error("Erreur lors de la mise à jour du like.");
            }

            const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
            if (action === "like") {
                likedProjects.push(id);
                setProjet({
                    ...projet,
                    fields: {
                        ...projet.fields,
                        Likes: (projet.fields.Likes || 0) + 1
                    }
                });
                setHasLiked(true);
            } else {
                const updatedLikes = Math.max((projet.fields.Likes || 0) - 1, 0);
                const newLikedProjects = likedProjects.filter((projId: string) => projId !== id);
                localStorage.setItem('likedProjects', JSON.stringify(newLikedProjects));
                setProjet({
                    ...projet,
                    fields: {
                        ...projet.fields,
                        Likes: updatedLikes
                    }
                });
                setHasLiked(false);
                return;
            }
            localStorage.setItem('likedProjects', JSON.stringify(likedProjects));
        } catch (error) {
            console.error("Erreur lors de la mise à jour du like :", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center">
                <p className="text-red-600 text-xl font-semibold mb-4">{error}</p>
                <Button variant="outline" onClick={() => window.history.back()}>
                    Retour
                </Button>
            </div>
        );
    }

    if (!projet) return null;

    return (
        <Fragment>
            <div className="flex justify-between items-center px-6 py-4 shadow-sm bg-white mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Studolio</h1>
                <Link to="/login">
                    <Button variant="default" className="bg-green-600 hover:bg-green-700">
                        Se connecter
                    </Button>
                </Link>
            </div>

            <div className="flex justify-center px-6 mb-6">
                <Button variant="outline" onClick={() => window.history.back()}>
                    Retour à la liste
                </Button>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 max-w-4xl mx-auto space-y-6">
                {projet.fields.Visuel && projet.fields.Visuel.length > 0 && (
                    <div className="flex justify-center mb-6">
                        <img
                            src={projet.fields.Visuel[0].url}
                            alt={projet.fields.Visuel[0].filename}
                            className="rounded-lg h-auto max-w-[300px]"
                        />
                    </div>
                )}

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-800">{projet.fields.Nom}</h1>
                    <p className="text-gray-700">
                        {projet.fields.Description || "Aucune description disponible."}
                    </p>

                    {projet.fields.GitHub && (
                        <p>
                            <strong>GitHub :</strong>{" "}
                            <a
                                href={projet.fields.GitHub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {projet.fields.GitHub}
                            </a>
                        </p>
                    )}

                    {projet.fields.Mots && (
                        <p>
                            <strong>Mots-clés :</strong> {projet.fields.Mots}
                        </p>
                    )}
                </div>

                {projet.fields.TechnosNames && projet.fields.TechnosNames.length > 0 && (
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800">Technologies utilisées :</h2>
                        <div className="flex flex-wrap gap-2">
                            {projet.fields.TechnosNames.map((techno, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium whitespace-nowrap"
                                >
                                    {techno}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {projet.fields.ÉtudiantsNames && projet.fields.ÉtudiantsNames.length > 0 && (
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold text-gray-800">Étudiants participants :</h2>
                        <div className="flex flex-wrap gap-2">
                            {projet.fields.ÉtudiantsNames.map((etudiant, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium whitespace-nowrap"
                                >
                                    {etudiant}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-2 pt-4">
                    <Button
                        variant="default"
                        onClick={handleLikeToggle}
                        className={hasLiked ? "bg-gray-400 hover:bg-gray-500" : "bg-pink-500 hover:bg-pink-600"}
                    >
                        {hasLiked ? "Je n'aime plus ce projet 💔" : "J'aime ce projet ❤️"}
                    </Button>
                    {typeof projet.fields.Likes === "number" && (
                        <p className="text-sm text-gray-500">
                            {projet.fields.Likes} like{projet.fields.Likes > 1 ? "s" : ""}
                        </p>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
