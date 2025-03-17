import { database } from "../../utils/db.server";

export async function updatePromotion(id: string, params: string) {
  await database(process.env.AIRTABLE_PROMO as string).update(id, {
    Nom: params,
  });
}
