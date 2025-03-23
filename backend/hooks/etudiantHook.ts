import { database } from "../utils/db.server";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";
import type { Etudiant } from "../interfaces/etudiant";

export async function getEtudiants(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_ETUDIANT as string)
            .select()
            .all();

        return {
            count: records.length,
            results: records.map((record: AirtableElement) => ({
                id: record.id,
                fields: record.fields,
            })),
        };
    } catch (error) {
        console.error("Error fetching etudiants:", error);
        throw error;
    }
}

export async function getEtudiant(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ETUDIANT as string).find(
        id
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createEtudiant(
    params: Etudiant
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ETUDIANT as string).create(
        {
            Nom: params.Nom,
            Prenom: params.Prenom,
            Email: params.Email,
            Promotion: params.Promotion,
            Projet: params.Projet,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updateEtudiant(
    id: string,
    params: Etudiant
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_ETUDIANT as string).update(
        id,
        {
            Nom: params.Nom,
            Prenom: params.Prenom,
            Email: params.Email,
            Promotion: params.Promotion,
            Projet: params.Projet,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deleteEtudiant(id: string): Promise<void> {
    await database(process.env.AIRTABLE_ETUDIANT as string).destroy(id);
}