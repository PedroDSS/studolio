export interface TechnoResponse {
  id: string;
  fields: {
    Nom: string;
  };
}

export interface CategoryResponse {
  id: string;
  fields: {
    Nom: string;
  };
}

export interface PromoResponse {
  id: string;
  fields: {
    Nom: string;
  };
}

export interface EtudiantResponse {
  id: string;
  fields: {
    Name: string;
    Nom: string;
    Prenom: string;
    Email: string;
    Promotion: string[] | null;
    Projet: string[] | null;
  };
}

export interface AdminResponse {
  id: string;
  fields: {
    Name: string;
    Nom: string;
    Prenom: string;
    Email: string;
  };
}

export interface ProjetResponse {
  id: string;
  fields: {
    Nom: string;
    Description: string;
    Likes: number;
    Mots: string;
    GitHub: string;
    Publié: string;
    Catégorie: string[];
    Technos: string[];
    TechnosNames: string[];
    Étudiants: string[];
    ÉtudiantsNames: string[];
    Commentaire: string[] | null;
    Visuel: Array<{
      id: string;
      width: number;
      height: number;
      url: string;
      filename: string;
      size: number;
      type: string;
      thumbnails: {
        small: {
          url: string;
          width: number;
          height: number;
        };
        large: {
          url: string;
          width: number;
          height: number;
        };
      };
    }> | null;
  };
}


export interface CommentResponse {
  id: string;
  fields: {
    Administrateur: string[];
    Notes: string;
    AuthorName?: string;
  };
}
