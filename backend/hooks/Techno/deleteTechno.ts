import { database } from "../../utils/db.server";

export async function deleteTechno(id: string): Promise<void> {
  await database(process.env.AIRTABLE_TECHNO as string).destroy(id);
}
