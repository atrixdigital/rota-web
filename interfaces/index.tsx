import { ApolloQueryResult } from "apollo-boost";
import { MeMe } from "../generated/apolloComponent";

export interface CrudProps<D, U, C> {
  deleteBy: D;
  updateBy: U;
  create: C;
  me?: MeMe;
}

export interface withRefetch<V, Q> {
  refetch: (variables?: V) => Promise<ApolloQueryResult<Q>>;
}
