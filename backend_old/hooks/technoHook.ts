import { database } from "../utils/db.server";
import type { Techno } from "../interfaces/techno";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse"

export async function getTechnos(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_TECHNO as string)
            .select()
            .all();

        // Pas opti car on charge tout, il nous faudrait un champs airtable qui le fait.
        // const totalCount = await database(process.env.AIRTABLE_TECHNO as string)
        //     .select()
        //     .all()
        //     .then((data) => data.length);

        return {
            count: records.length, //totalCount,
            results: records.map((record: AirtableElement) => ({
                id: record.id,
                fields: record.fields
            })),
        };
    } catch (error) {
        console.error("Error fetching technos:", error);
        throw error;
    }
}

export async function getTechno(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_TECHNO as string).find(id);

    return {
        id: record.id,
        fields: record.fields
    }
}

export async function createTechno(
    param: Techno["Nom"]
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_TECHNO as string).create({
        Nom: param,
    });

    return {
        id: record.id,
        fields: record.fields
    }
}

export async function updateTechno(
    id: string,
    params: Techno["Nom"]
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_TECHNO as string).update(
        id,
        {
            Nom: params,
        }
    );

    return {
        id: record.id,
        fields: record.fields
    };
}

export async function deleteTechno(id: string): Promise<void> {
    await database(process.env.AIRTABLE_TECHNO as string).destroy(id);
}