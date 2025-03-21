import { database } from "../../utils/db.server";

export async function deleteCategorie(id: string): Promise<void> {
  await database(process.env.AIRTABLE_CATEGORIE as string).destroy(id);
}
