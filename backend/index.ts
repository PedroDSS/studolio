import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { jwt } from "@elysiajs/jwt";
import { swagger } from '@elysiajs/swagger'

import { adminsRoutes } from "./routes/adminsRoutes";
import { categoriesRoutes } from "./routes/categoriesRoutes";
import { commentsRoutes } from "./routes/commentsRoutes";
import { etudiantsRoutes } from "./routes/etudiantsRoutes";
import { loginRoute } from "./routes/loginRoute";
import { promotionsRoutes } from "./routes/promotionsRoutes";
import { projetsRoutes } from "./routes/projetRoutes";
import { technosRoutes } from "./routes/technosRoutes";
import { updatePasswordRoute } from "./routes/updatePasswordRoute";

const app = new Elysia()
  .use(cors({
    origin: process.env.NUXT_URL || process.env.REACT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }))

  .use(jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET_ACCESS_TOKEN || "la-super-cle-secrete",
  }))

  // Access to swagger with <base_url>/swagger
  // Note: The documentation is not correctly filled because documentation for each route is missing.
  .use(swagger())
  .use(adminsRoutes)
  .use(categoriesRoutes)
  .use(commentsRoutes)
  .use(etudiantsRoutes)
  .use(loginRoute)
  .use(promotionsRoutes)
  .use(projetsRoutes)
  .use(technosRoutes)
  .use(updatePasswordRoute)

  // Base route in order to check if Elysia API is working correctly.
  .get("/", () => "This API is made with Elysia.JS !")

app.listen(3000);
console.log(`Started Elysia on URL : http://localhost:3000`);
