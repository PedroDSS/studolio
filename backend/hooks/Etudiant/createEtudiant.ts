import { database } from "../../utils/db.server";
import type { Etudiant } from "../../interfaces/etudiant";

export async function createEtudiant(params: Etudiant) {
  await database(process.env.AIRTABLE_ETUDIANT as string).create({
    Nom: params.Nom,
    Prenom: params.Prenom,
    Email: params.Email,
    Promotion: params.Promotion,
    Projet: params.Projet,
  });
}
