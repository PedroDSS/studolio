import { database } from "../../utils/db.server";

export async function updateTechno(id: string, params: string) {
  await database(process.env.AIRTABLE_TECHNO as string).update(id, {
    Nom: params,
  });
}
