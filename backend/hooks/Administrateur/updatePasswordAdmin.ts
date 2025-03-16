import { database } from "../../utils/db.server";
import type { Administrateur } from "../../interfaces/administrateur";
import { hashPassword } from "../../utils/hashPassword";

export async function updatePasswordAdmin(
  id: string,
  password: Administrateur["Mot de passe"]
) {
  await database(process.env.AIRTABLE_ADMIN as string).update(id, {
    "Mot de passe": await hashPassword(password),
  });
}
