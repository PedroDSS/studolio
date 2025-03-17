import { adminsRoutes } from "./routes/adminsRoutes";
import { categoriesRoutes } from "./routes/categoriesRoutes";
import { etudiantsRoutes } from "./routes/etudiantsRoutes";
import { loginRoute } from "./routes/loginRoute";
import { promotionsRoutes } from "./routes/promotionsRoutes";
import { technosRoutes } from "./routes/technosRoutes";
import { updatePasswordRoute } from "./routes/updatePasswordRoute";

const allowedOrigins = [process.env.NUXT_URL, process.env.REACT_URL];

Bun.serve({
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);

    const origin = req.headers.get("Origin");
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": "",
    };

    if (origin && allowedOrigins.includes(origin)) {
      headers["Access-Control-Allow-Origin"] = origin;
    }

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers,
      });
    }

    switch (true) {
      case url.pathname.startsWith("/admins"): {
        return adminsRoutes(req, url, headers);
      }
      case url.pathname.startsWith("/login"): {
        return loginRoute(req, url, headers);
      }
      case url.pathname.startsWith("/updatePassword"): {
        return updatePasswordRoute(req, url, headers);
      }
      case url.pathname.startsWith("/etudiants"): {
        return etudiantsRoutes(req, url, headers);
      }
      case url.pathname.startsWith("/technos"): {
        return technosRoutes(req, url, headers);
      }
      case url.pathname.startsWith("/promotions"): {
        return promotionsRoutes(req, url, headers);
      }
      case url.pathname.startsWith("/categories"): {
        return categoriesRoutes(req, url, headers);
      }
      default: {
        return new Response("Not Found", { status: 404, headers });
      }
    }
  },
});
