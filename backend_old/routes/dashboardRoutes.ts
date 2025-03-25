import Elysia from "elysia";
import { totalLikes } from "../hooks/dashboardHook";

export const dashboardRoutes = new Elysia({prefix: "/dashboard"})
  .get("/", async () => {
    return await totalLikes();
  })