import App, { Container } from "next/app";
import { withRouter, WithRouterProps } from "next/router";
import { ApolloProvider, compose } from "react-apollo";
import "react-toggle/style.css";
// @ts-ignore
import TopBarProgress from "react-topbar-progress-indicator";
import withApollo from "../lib/withApollo";
import "../static/assets/css/argon-dashboard-react.css";

import "../static/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../static/assets/vendor/nucleo/css/nucleo.css";

import "../static/assets/css/style.css";

interface State {
  isLoading: boolean;
}

TopBarProgress.config({
  barColors: {
    "0": "#fff",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

class MyApp extends App<WithRouterProps | any, State> {
  state: Readonly<State> = {
    isLoading: false
  };

  constructor(props: WithRouterProps | any) {
    super(props);
    const { router } = this.props;
    if (router) {
      router.events.on("routeChangeStart", () => {
        this.setState(() => ({ isLoading: true }));
      });
      router.events.on("routeChangeComplete", () => {
        this.setState(() => ({ isLoading: false }));
      });
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        {this.state.isLoading && <TopBarProgress />}
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default compose(
  withApollo,
  withRouter
)(MyApp);
