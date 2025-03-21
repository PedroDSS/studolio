import { database } from "../../utils/db.server";
import type { Administrateur } from "../../interfaces/administrateur";
import { hashPassword } from "../../utils/hashPassword";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function updatePasswordAdmin(
  id: string,
  password: Administrateur["Mot de passe"]
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ADMIN as string).update(
    id,
    {
      "Mot de passe": await hashPassword(password),
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
