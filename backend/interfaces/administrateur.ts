export interface Administrateur {
  Nom: string;
  Prenom: string;
  Email: string;
  "Mot de passe": string;
}

export type UpdateAdministrateur = Omit<Administrateur, "Mot de passe">;
