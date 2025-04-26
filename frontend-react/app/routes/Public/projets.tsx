import { useState, useEffect, useCallback, Fragment } from "react";
import { Link } from "react-router-dom";
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
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components";

export default function Projets() {
    const [data, setData] = useState<{ records: ProjetResponse[]; offset?: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [offsetStack, setOffsetStack] = useState<string[]>([]);
    const [currentOffset, setCurrentOffset] = useState<string | null>(null);
    const limit = 10;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setCurrentOffset(null);
            setOffsetStack([]);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const fetchProjets = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("limit", limit.toString());
            if (currentOffset) {
                params.append("offset", currentOffset);
            }
            if (debouncedSearchTerm) {
                params.append("search", debouncedSearchTerm);
            }

            const res = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/projets?${params.toString()}`);
            if (!res.ok) throw new Error(`Erreur serveur : ${res.status}`);
            const json = await res.json();
            setData(json);
        } catch (err: any) {
            setError(err.message || "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    }, [currentOffset, debouncedSearchTerm]);

    useEffect(() => {
        fetchProjets();
    }, [fetchProjets]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleNextPage = () => {
        if (data?.offset) {
            setOffsetStack((prev) => [...prev, data.offset]);
            setCurrentOffset(data.offset);
        }
    };

    const handlePrevPage = () => {
        if (offsetStack.length > 1) {
            const newStack = [...offsetStack];
            newStack.pop();
            const previousOffset = newStack[newStack.length - 1];
            setOffsetStack(newStack);
            setCurrentOffset(previousOffset);
        } else {
            setOffsetStack([]);
            setCurrentOffset(null);
        }
    };

    if (loading)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-600">
                <p>Erreur : {error}</p>
                <Button variant="outline" onClick={() => fetchProjets()} className="mt-4">
                    Réessayer
                </Button>
            </div>
        );

    if (!data) return null;

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

            <div className="flex flex-col items-center justify-center mb-8">
                <Badge variant="secondary" className="mb-6">
                    {data.records.length} projet{data.records.length > 1 ? "s" : ""} trouvé{data.records.length > 1 ? "s" : ""}
                </Badge>

                <Input
                    placeholder="Rechercher un projet par mots-clés..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md"
                />
            </div>

            <div className="px-6 sm:px-10 md:px-20">
                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {data.records.length > 0 ? (
                        data.records.map((projet) => (
                            <Card
                                key={projet.id}
                                className="border border-gray-200 hover:shadow-xl transition-all duration-300 p-6 rounded-2xl bg-white flex flex-col justify-between"
                            >
                                <CardHeader className="text-center space-y-1">
                                    <CardTitle className="text-lg font-bold text-gray-800">
                                        {projet.fields.Nom}
                                    </CardTitle>
                                    {projet.fields.Description && (
                                        <CardDescription className="text-gray-500 text-sm">
                                            {projet.fields.Description}
                                        </CardDescription>
                                    )}
                                </CardHeader>
                                <div className="flex flex-col gap-3 mt-4 flex-1 text-sm">
                                    {projet.fields.TechnosNames && projet.fields.TechnosNames.length > 0 && (
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 font-semibold text-xs text-center mb-1">Technos :</span>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {projet.fields.TechnosNames.map((techno, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full font-medium whitespace-nowrap"
                                                    >
                                                        {techno}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {projet.fields.ÉtudiantsNames && projet.fields.ÉtudiantsNames.length > 0 && (
                                        <div className="flex flex-col">
                                            <span className="text-gray-700 font-semibold text-xs text-center mb-1">Étudiants :</span>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {projet.fields.ÉtudiantsNames.map((student, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium whitespace-nowrap"
                                                    >
                                                        {student}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <CardFooter className="flex justify-center mt-5">
                                    <Link
                                        to={`/projet/${projet.id}`}
                                        className="px-4 py-1.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors"
                                    >
                                        Voir le projet
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            Aucun projet trouvé.
                        </p>
                    )}
                </div>
            </div>


            <div className="flex justify-center items-center space-x-4 mt-10">
                <Button
                    variant="outline"
                    disabled={offsetStack.length === 0}
                    onClick={handlePrevPage}
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    disabled={!data.offset}
                    onClick={handleNextPage}
                >
                    Suivant
                </Button>
            </div>
        </Fragment>
    );
}
