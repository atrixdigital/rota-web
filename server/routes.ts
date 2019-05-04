import Routes, * as nextRoutes from "next-routes";
import { dynamicRoutes } from "../shared/dynamicRoutes";

// @ts-ignore
export const routes = nextRoutes() as Routes;
export const Router = routes.Router;
export const Link = routes.Link;

// routes.add("project", "/project/:id");
routes.add("auth", "/auth/:route");
dynamicRoutes.map(route => {
  routes.add("crud", route.path);
});
