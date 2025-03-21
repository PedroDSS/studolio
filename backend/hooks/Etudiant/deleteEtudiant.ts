import { database } from "../../utils/db.server";

export async function deleteEtudiant(id: string): Promise<void> {
  await database(process.env.AIRTABLE_ETUDIANT as string).destroy(id);
}
