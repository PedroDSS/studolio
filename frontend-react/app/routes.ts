import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("./routes/Public/projets.tsx"),
  route("projet/:id", "./routes/Public/projet.tsx"),
  route("login", "./routes/login.tsx"),
  route("logout", "./routes/logout.tsx"),

  layout("./routes/_layoutDashboard.tsx", [
    route("admin/dashboard", "./routes/dashboard.tsx"),

    route("admin/technos", "./routes/Techno/technos.tsx"),
    route("admin/technos/create", "./routes/Techno/createTechno.tsx"),
    route("admin/technos/update/:id", "./routes/Techno/updateTechno.tsx"),

    route("admin/categories", "./routes/Categorie/categories.tsx"),
    route("admin/categories/create", "./routes/Categorie/createCategorie.tsx"),
    route("admin/categories/update/:id", "./routes/Categorie/updateCategorie.tsx"),

    route("admin/promotions", "./routes/Promotion/promotions.tsx"),
    route("admin/promotions/create", "./routes/Promotion/createPromotion.tsx"),
    route("admin/promotions/update/:id", "./routes/Promotion/updatePromotion.tsx"),

    route("admin/etudiants", "./routes/Etudiant/etudiants.tsx"),
    route("admin/etudiants/create", "./routes/Etudiant/createEtudiant.tsx"),
    route("admin/etudiants/:id", "./routes/Etudiant/etudiant.tsx"),
    route("admin/etudiants/update/:id", "./routes/Etudiant/updateEtudiant.tsx"),

    route("admin/admins", "./routes/Admin/admins.tsx"),
    route("admin/admins/create", "./routes/Admin/createAdmin.tsx"),
    route("admin/admins/:id", "./routes/Admin/admin.tsx"),
    route("admin/admins/update/:id", "./routes/Admin/updateAdmin.tsx"),
    route(
      "admin/admins/update/password/:id",
      "./routes/Admin/updateAdminPassword.tsx"
    ),

    route("admin/projets", "./routes/Projet/projets.tsx"),
    route("admin/projets/create", "./routes/Projet/createProjet.tsx"),
    route("admin/projets/:id", "./routes/Projet/projet.tsx"),
    route("admin/projets/update/:id", "./routes/Projet/updateProjet.tsx"),
    route("admin/projets/comment/:id", "./routes/Projet/projetComment.tsx"),

    route(
      "admin/projets/comment/edit/:idProjet/:idComment",
      "./routes/Projet/projetCommentEdit.tsx"
    ),
  ]),
] satisfies RouteConfig;
