import { database } from "../../utils/db.server";
import type { Admin } from "../../interfaces/administrateur";

export async function getAdmins(): Promise<Admin[]> {
  const admins = database
    .table(process.env.AIRTABLE_ADMIN as string)
    .select()
    .all();

  return (await admins).map((admin) => ({
    id: admin.id,
    fields: {
      Name: admin.fields.Name,
      Nom: admin.fields.Nom,
      Prenom: admin.fields.Prenom,
      Email: admin.fields.Email,
      "Mot de passe": admin.fields["Mot de passe"],
      Commentaire: admin.fields.Commentaire,
    },
  }));
}
