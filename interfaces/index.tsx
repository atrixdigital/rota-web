import { MeMe } from "../generated/apolloComponent";

export interface CrudProps<D, U, C> {
  deleteBy: D;
  updateBy: U;
  create: C;
  me?: MeMe;
}
