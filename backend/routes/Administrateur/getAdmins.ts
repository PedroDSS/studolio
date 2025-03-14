import { database } from "../../utils/db.server";
import type { Admin } from "../../interfaces/administrateur";

export async function getAdmins(): Promise<Admin[]> {
  try {
    const records = await database(process.env.AIRTABLE_ADMIN as string)
      .select()
      .all();
    return records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
}
