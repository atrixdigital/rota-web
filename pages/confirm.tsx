import * as React from "react";

import { MyContext } from "../interfaces/MyContext";
import redirect from "../lib/redirect";
import {
  ConfirmUserMutation,
  ConfirmUserVariables,
  ConfirmUserDocument
} from "../generated/apolloComponent";

export default class Confirm extends React.PureComponent {
  static async getInitialProps({
    query: { token },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!token) {
      return {};
    }

    await apolloClient.mutate<ConfirmUserMutation, ConfirmUserVariables>({
      mutation: ConfirmUserDocument,
      variables: {
        token: token as string
      }
    });

    redirect(ctx, "/auth/login");

    return {};
  }

  render() {
    return "something went wrong";
  }
}
