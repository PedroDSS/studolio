import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { database } from "../../utils/db.server";
import type { Promotion } from "../../interfaces/promotion";

export async function createPromotion(
  param: Promotion["Nom"]
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_PROMO as string).create({
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
