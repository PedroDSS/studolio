import { database } from "../../utils/db.server";

export async function createTechno(param: string) {
  await database(process.env.AIRTABLE_TECHNO as string).create({
    Nom: param,
  });
}
