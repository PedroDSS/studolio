import { database } from "../utils/db.server";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";
import type { Promotion } from "../interfaces/promotion";

export async function getPromotions(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_PROMO as string)
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
        console.error("Error fetching promotions:", error);
        throw error;
    }
}

export async function getPromotion(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROMO as string).find(id);

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createPromotion(
    param: Promotion["Nom"]
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROMO as string).create({
        Nom: param,
    });

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updatePromotion(
    id: string,
    params: Promotion["Nom"]
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_PROMO as string).update(
        id,
        {
            Nom: params,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deletePromotion(id: string): Promise<void> {
    await database(process.env.AIRTABLE_PROMO as string).destroy(id);
}