import { database } from "../../utils/db.server";
import type { UpdateAdministrateur } from "../../interfaces/administrateur";

export async function updateAdmin(id: string, params: UpdateAdministrateur) {
  await database(process.env.AIRTABLE_ADMIN as string).update(id, {
    Nom: params.Nom,
    Prenom: params.Prenom,
    Email: params.Email,
  });
}
