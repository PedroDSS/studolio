import { database } from "../../utils/db.server";

export async function updateCategorie(id: string, params: string) {
  await database(process.env.AIRTABLE_CATEGORIE as string).update(id, {
    Nom: params,
  });
}
