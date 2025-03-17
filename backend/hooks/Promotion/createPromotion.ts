import { database } from "../../utils/db.server";

export async function createPromotion(param: string) {
  await database(process.env.AIRTABLE_PROMO as string).create({
    Nom: param,
  });
}
