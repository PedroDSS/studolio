import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { database } from "../../utils/db.server";
import type { Techno } from "../../interfaces/techno";

export async function updateTechno(
  id: string,
  params: Techno["Nom"]
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_TECHNO as string).update(
    id,
    {
      Nom: params,
    }
  );

  return {
    data: [
      {
        id: record.id,
        fields: record.fields,
      },
    ],
  };
}
