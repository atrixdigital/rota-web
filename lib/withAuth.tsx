import * as React from "react";
import { MeQuery } from "../generated/apolloComponent";
import { meQuery } from "../graphql/user/query/me";
import { MyContext } from "../interfaces/MyContext";
import redirect from "./redirect";

export const withAuth = <T extends object>(C: React.ComponentClass<T>) => {
  return class AuthComponent extends React.Component<T> {
    static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
      const response = await apolloClient.query<MeQuery>({ query: meQuery });
      if (!response || !response.data || !response.data.me) {
        redirect(ctx, "/auth/login");
        return {
          me: null
        };
      }

      return {
        me: response.data.me,
        query: ctx.query
      };
    }

    render() {
      return <C {...this.props} />;
    }
  };
};
