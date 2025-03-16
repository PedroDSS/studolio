import { database } from "../../utils/db.server";
import type { Etudiant } from "../../interfaces/etudiant";

export async function updateEtudiant(id: string, params: Etudiant) {
  await database(process.env.AIRTABLE_ETUDIANT as string).update(id, {
    Nom: params.Nom,
    Prenom: params.Prenom,
    Email: params.Email,
    Promotion: params.Promotion,
    Projet: params.Projet,
  });
}
