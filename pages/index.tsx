import * as React from "react";
import redirect from "../lib/redirect";
import { MyContext } from "../interfaces/MyContext";

export default class extends React.Component {
  static getInitialProps(ctx: MyContext) {
    redirect(ctx, "/about");
    return {};
  }

  render() {
    return null;
  }
}
