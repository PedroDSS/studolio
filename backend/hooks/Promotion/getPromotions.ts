import { database } from "../../utils/db.server";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function getPromotions(): Promise<AirtableResponse[]> {
  try {
    const records = await database(process.env.AIRTABLE_PROMO as string)
      .select()
      .all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching promotions:", error);
    throw error;
  }
}
