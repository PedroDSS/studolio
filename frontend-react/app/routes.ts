import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/login.tsx"),
  route("logout", "./routes/logout.tsx"),

  layout("./routes/_layoutDashboard.tsx", [
    route("dashboard", "./routes/dashboard.tsx"),

    route("technos", "./routes/Techno/technos.tsx"),
    route("technos/create", "./routes/Techno/createTechno.tsx"),
    route("technos/update/:id", "./routes/Techno/updateTechno.tsx"),

    route("categories", "./routes/Categorie/categories.tsx"),
    route("categories/create", "./routes/Categorie/createCategorie.tsx"),
    route("categories/update/:id", "./routes/Categorie/updateCategorie.tsx"),

    route("promotions", "./routes/Promotion/promotions.tsx"),
    route("promotions/create", "./routes/Promotion/createPromotion.tsx"),
    route("promotions/update/:id", "./routes/Promotion/updatePromotion.tsx"),

    route("etudiants", "./routes/Etudiant/etudiants.tsx"),
    route("etudiants/create", "./routes/Etudiant/createEtudiant.tsx"),
    route("etudiants/:id", "./routes/Etudiant/etudiant.tsx"),
    route("etudiants/update/:id", "./routes/Etudiant/updateEtudiant.tsx"),

    route("admins", "./routes/Admin/admins.tsx"),
    route("admins/create", "./routes/Admin/createAdmin.tsx"),
    route("admins/:id", "./routes/Admin/admin.tsx"),
    route("admins/update/:id", "./routes/Admin/updateAdmin.tsx"),
    route(
      "admins/update/password/:id",
      "./routes/Admin/updateAdminPassword.tsx"
    ),

    route("projets", "./routes/Projet/projets.tsx"),
    route("projets/create", "./routes/Projet/createProjet.tsx"),
    route("projets/:id", "./routes/Projet/projet.tsx"),
    route("projets/update/:id", "./routes/Projet/updateProjet.tsx"),
    route("projets/comment/:id", "./routes/Projet/projetComment.tsx"),

    route(
      "/projets/comment/edit/:idProjet/:idComment",
      "./routes/Projet/projetCommentEdit.tsx"
    ),
  ]),
] satisfies RouteConfig;
