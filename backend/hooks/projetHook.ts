import { database } from "../utils/db.server";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";
import type { Projet } from "../interfaces/projet";

export async function getProjets(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_PROJET as string)
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
        console.error("Error fetching projets:", error);
        throw error;
    }
}

export async function getProjet(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROJET as string).find(
        id
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createProjet(
    params: Projet
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROJET as string).create(
        {
            Nom: params.Nom,
            Description: params.Description
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updateProjet(
    id: string,
    params: Projet
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROJET as string).update(
        id,
        {
            Nom: params.Nom,
            Description: params.Description
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deleteProjet(id: string): Promise<void> {
    await database(process.env.AIRTABLE_PROJET as string).destroy(id);
}