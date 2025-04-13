import { database } from "../utils/db.server";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";
import type { Categorie } from "../interfaces/categorie";

export async function getCategories(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_CATEGORIE as string)
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
        console.error("Error fetching technos:", error);
        throw error;
    }
}

export async function getCategorie(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_CATEGORIE as string).find(
        id
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createCategorie(
    param: Categorie["Nom"]
): Promise<AirtableElement> {
    const record = await database(
        process.env.AIRTABLE_CATEGORIE as string
    ).create({
        Nom: param,
    });

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updateCategorie(
    id: string,
    params: Categorie["Nom"]
): Promise<AirtableElement> {
    const record = await database(
        process.env.AIRTABLE_CATEGORIE as string
    ).update(id, {
        Nom: params,
    });

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deleteCategorie(id: string): Promise<void> {
    await database(process.env.AIRTABLE_CATEGORIE as string).destroy(id);
}