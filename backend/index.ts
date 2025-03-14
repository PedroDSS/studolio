import { getAdmins } from "./routes";

Bun.serve({
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    console.log(url)
    switch (url.pathname) {
      case "/getAdmins": {
        const admins = await getAdmins();
        return new Response(JSON.stringify(admins), {
          headers: { "Content-Type": "application/json" },
        });
      }
      default: {
        return new Response("Not Found", { status: 404 });
      }
    }
  },
});
