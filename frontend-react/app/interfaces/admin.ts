export default interface Admin {
  id: string;
  fields: {
    Name: string;
    Nom: string;
    Prenom: string;
    Email: string;
    "Mot de passe": string;
    Commentaire?: string[];
  };
}
