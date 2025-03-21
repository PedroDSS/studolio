import { database } from "../../utils/db.server";
import type { UpdateAdministrateur } from "../../interfaces/administrateur";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function updateAdmin(
  id: string,
  params: UpdateAdministrateur
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ADMIN as string).update(
    id,
    {
      Nom: params.Nom,
      Prenom: params.Prenom,
      Email: params.Email,
    }
  );

  return {
    data: [
      {
        id: record.id,
        fields: record.fields,
      },
    ],
  };
}
