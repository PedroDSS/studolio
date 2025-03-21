import { database } from "../../utils/db.server";

export async function deleteAdmin(id: string): Promise<void> {
  await database(process.env.AIRTABLE_ADMIN as string).destroy(id);
}
