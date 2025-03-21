import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { database } from "../../utils/db.server";
import type { Techno } from "../../interfaces/techno";

export async function createTechno(
  param: Techno["Nom"]
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_TECHNO as string).create({
    Nom: param,
  });

  return {
    data: [
      {
        id: record.id,
        fields: record.fields,
      },
    ],
  };
}
