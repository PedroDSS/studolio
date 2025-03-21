import type { AirtableResponse } from "../../interfaces/airtableResponse";
import type { Categorie } from "../../interfaces/categorie";
import { database } from "../../utils/db.server";

export async function updateCategorie(
  id: string,
  params: Categorie["Nom"]
): Promise<AirtableResponse> {
  const record = await database(
    process.env.AIRTABLE_CATEGORIE as string
  ).update(id, {
    Nom: params,
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
