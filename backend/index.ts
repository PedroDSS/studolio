import { getAdmins } from "./routes";

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
      default: {
        return new Response("Not Found", { status: 404, headers });
      }
    }
  },
});
