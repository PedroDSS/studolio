import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { database } from "../../utils/db.server";
import type { Categorie } from "../../interfaces/categorie";

export async function createCategorie(
  param: Categorie["Nom"]
): Promise<AirtableResponse> {
  const record = await database(
    process.env.AIRTABLE_CATEGORIE as string
  ).create({
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
