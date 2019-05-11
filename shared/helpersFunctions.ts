import { MeMe } from "../generated/apolloComponent";

export const isAdmin = (me?: MeMe): boolean =>
  me && !!me.role && me.role.title === "Admin";
export const isManager = (me?: MeMe): boolean => !isAdmin(me);
