import type { AirtableResponse } from "../interfaces/airtableResponse";
import { database } from "../utils/db.server";

export async function totalLikes(): Promise<Array<Omit<AirtableResponse["results"][number], "id">>> {
    const records = await database(process.env.AIRTABLE_DASHBOARD as string).select({ fields: ["Total likes"] }).all();

    return records.map(record => ({
        fields: record.fields["Total likes"],
    }));
}