import { database } from "../../utils/db.server";
import type { Administrateur } from "../../interfaces/administrateur";
import { hashPassword } from "../../utils/hashPassword";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function createAdmin(
  params: Administrateur
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ADMIN as string).create({
    Nom: params.Nom,
    Prenom: params.Prenom,
    Email: params.Email,
    "Mot de passe": await hashPassword(params["Mot de passe"]),
  });

  return {
    data: [
      {
        id: record.id,
        fields: record.fields,
      },
    ],
  };
}
