import { database } from "../../utils/db.server";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function getPromotion(id: string): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_PROMO as string).find(id);

  return {
    id: record.id,
    fields: record.fields,
  };
}
