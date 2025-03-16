import { database } from "../../utils/db.server";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function getEtudiant(id: string): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ETUDIANT as string).find(
    id
  );

  return {
    id: record.id,
    fields: record.fields,
  };
}
