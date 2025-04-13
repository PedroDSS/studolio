import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    index("./routes/dashboard.tsx"),

    route("technos", "./routes/Techno/technos.tsx"),
    route("technos/create", "./routes/Techno/createTechno.tsx"),
    route("technos/:id", "./routes/Techno/techno.tsx"),
    route("technos/update/:id", "./routes/Techno/updateTechno.tsx"),

    route("promotions", "./routes/Promotion/promotions.tsx"),
    route("promotions/create", "./routes/Promotion/createPromotion.tsx"),
    route("promotions/:id", "./routes/Promotion/promotion.tsx"),
    route("promotions/update/:id", "./routes/Promotion/updatePromotion.tsx"),

    route("categories", "./routes/Categorie/categories.tsx"),
    route("categories/create", "./routes/Categorie/createCategorie.tsx"),
    route("categories/:id", "./routes/Categorie/categorie.tsx"),
    route("categories/update/:id", "./routes/Categorie/updateCategorie.tsx"),

    route("etudiants", "./routes/Etudiant/etudiants.tsx"),
    route("etudiants/create", "./routes/Etudiant/createEtudiant.tsx"),
    route("etudiants/:id", "./routes/Etudiant/etudiant.tsx"),
    route("etudiants/update/:id", "./routes/Etudiant/updateEtudiant.tsx"),

    route("projets", "./routes/Projet/projets.tsx"),
    route("projets/create", "./routes/Projet/createProjet.tsx"),
    route("projets/:id", "./routes/Projet/projet.tsx"),
    route("projets/update/:id", "./routes/Projet/updateProjet.tsx"),
  ]),
] satisfies RouteConfig;
