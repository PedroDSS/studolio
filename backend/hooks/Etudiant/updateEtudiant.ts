import { database } from "../../utils/db.server";
import type { Etudiant } from "../../interfaces/etudiant";
import type { AirtableResponse } from "../../interfaces/airtableResponse";

export async function updateEtudiant(
  id: string,
  params: Etudiant
): Promise<AirtableResponse> {
  const record = await database(process.env.AIRTABLE_ETUDIANT as string).update(
    id,
    {
      Nom: params.Nom,
      Prenom: params.Prenom,
      Email: params.Email,
      Promotion: params.Promotion,
      Projet: params.Projet,
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
