import { database } from "../../utils/db.server";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function getAdmin(id: string): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ADMIN as string).find(id);

  return record;
}
