import { database } from "../utils/db.server";
import type { AirtableElement, AirtableResponse } from "../interfaces/airtableResponse";
import type { Comment } from "../interfaces/comment";

export async function getComments(): Promise<AirtableResponse> {
    try {
        const records = await database(process.env.AIRTABLE_COMMENT as string)
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
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export async function getComment(id: string): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_COMMENT as string).find(
        id
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function createComment(
    params: Comment
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_COMMENT as string).create(
        {
            Nom: params.Nom,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function updateComment(
    id: string,
    params: Comment
): Promise<AirtableElement> {
    const record = await database(process.env.AIRTABLE_COMMENT as string).update(
        id,
        {
            Nom: params.Nom,
        }
    );

    return {
        id: record.id,
        fields: record.fields,
    }
}

export async function deleteComment(id: string): Promise<void> {
    await database(process.env.AIRTABLE_COMMENT as string).destroy(id);
}