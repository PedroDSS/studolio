import { database } from "../../utils/db.server";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function getCategories(): Promise<AirtableResponse[]> {
  try {
    const records = await database(process.env.AIRTABLE_CATEGORIE as string)
      .select()
      .all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching technos:", error);
    throw error;
  }
}
