import App, { Container } from "next/app";

// import "../assets/vendor/nucleo/css/nucleo.css";
// import "../assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import "../assets/scss/argon-dashboard-react.scss";

import "../static/assets/vendor/nucleo/css/nucleo.css";
import "../static/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "../static/assets/css/argon-dashboard-react.css";

// @ts-ignore
import TopBarProgress from "react-topbar-progress-indicator";

import { ApolloProvider, compose } from "react-apollo";
import withApollo from "../lib/withApollo";
import { withRouter, WithRouterProps } from "next/router";

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
