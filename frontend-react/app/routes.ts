import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./routes/_layout.tsx", [
    index("./routes/dashboard.tsx"),
    route("technos", "./routes/technos.tsx"),
  ]),
] satisfies RouteConfig;
