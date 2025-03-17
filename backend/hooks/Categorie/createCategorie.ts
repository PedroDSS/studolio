import { database } from "../../utils/db.server";

export async function createCategorie(param: string) {
  await database(process.env.AIRTABLE_CATEGORIE as string).create({
    Nom: param,
  });
}
