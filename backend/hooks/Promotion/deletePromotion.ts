import { database } from "../../utils/db.server";

export async function deletePromotion(id: string): Promise<void> {
  await database(process.env.AIRTABLE_PROMO as string).destroy(id);
}
