import type { Administrateur } from "./interfaces/administrateur";
import { getAdmins, getAdmin, createAdmin, connectAdmin } from "./routes";

const allowedOrigins = [process.env.NUXT_URL, process.env.REACT_URL];

Bun.serve({
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    console.log(url);

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

    switch (url.pathname) {
      case "/getAdmins": {
        try {
          const admins = await getAdmins();
          return new Response(JSON.stringify(admins), {
            headers,
          });
        } catch (error) {
          console.error("Error in /getAdmins route:", error);
          return new Response("Internal Server Error", {
            status: 500,
            headers,
          });
        }
      }
      case "/getAdmin": {
        try {
          const adminId = url.searchParams.get("id");
          if (!adminId) {
            return new Response("Bad Request: Missing admin ID", {
              status: 400,
              headers,
            });
          }
          const admin = await getAdmin(adminId);
          return new Response(JSON.stringify(admin), {
            headers,
          });
        } catch (error) {
          console.error("Error in /getAdmin route:", error);
          return new Response("Internal Server Error", {
            status: 500,
            headers,
          });
        }
      }
      case "/createAdmin": {
        try {
          if (req.method !== "POST") {
            return new Response("Method Not Allowed", {
              status: 405,
              headers,
            });
          }

          const requestBody = (await req.json()) as Administrateur;

          await createAdmin({
            Nom: requestBody.Nom,
            Prenom: requestBody.Prenom,
            Email: requestBody.Email,
            "Mot de passe": requestBody["Mot de passe"],
          });

          return new Response("Admin created !", {
            status: 201,
            headers,
          });
        } catch (error) {
          console.error("Error in /createAdmin route:", error);
          return new Response("Internal Server Error", {
            status: 500,
            headers,
          });
        }
      }
      case "/connectAdmin": {
        try {
          if (req.method !== "POST") {
            return new Response("Method Not Allowed", {
              status: 405,
              headers,
            });
          }

          const requestBody = (await req.json()) as {
            email: string;
            password: string;
          };
          const admin = await connectAdmin(
            requestBody.email,
            requestBody.password
          );
          return new Response(JSON.stringify(admin), {
            headers,
          });
        } catch (error) {
          console.error("Error in /connectAdmin route:", error);
          return new Response("Internal Server Error", {
            status: 500,
            headers,
          });
        }
      }
      default: {
        return new Response("Not Found", { status: 404, headers });
      }
    }
  },
});
