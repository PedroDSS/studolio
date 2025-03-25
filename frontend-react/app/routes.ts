import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    index("./routes/dashboard.tsx"),

    route("technos", "./routes/Technos/technos.tsx"),
    route("technos/create", "./routes/Technos/createTechno.tsx"),
    route("technos/:id", "./routes/Technos/techno.tsx"),
    route("technos/update/:id", "./routes/Technos/updateTechno.tsx"),

    route("promotions", "./routes/Promotion/promotions.tsx"),
    route("promotions/create", "./routes/Promotion/createPromotion.tsx"),
    route("promotions/:id", "./routes/Promotion/promotion.tsx"),
    route("promotions/update/:id", "./routes/Promotion/updatePromotion.tsx"),

    route("categories", "./routes/Categorie/categories.tsx"),
    route("categories/create", "./routes/Categorie/createCategorie.tsx"),
    route("categories/:id", "./routes/Categorie/categorie.tsx"),
    route("categories/update/:id", "./routes/Categorie/updateCategorie.tsx"),
  ]),
] satisfies RouteConfig;
