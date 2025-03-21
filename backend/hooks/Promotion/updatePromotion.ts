import type { AirtableResponse } from "../../interfaces/airtableResponse";
import { database } from "../../utils/db.server";
import type { Promotion } from "../../interfaces/promotion";

export async function updatePromotion(
  id: string,
  params: Promotion["Nom"]
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_PROMO as string).update(
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
