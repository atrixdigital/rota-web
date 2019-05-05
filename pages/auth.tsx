import React from "react";
import { Container, Row, Col } from "reactstrap";
import AuthNavbar from "../components/Navbars/AuthNavbar";
import AuthFooter from "../components/Footers/AuthFooter";
import Login from "../views/Login";
import Register from "../views/Register";

interface Props {
  path: string;
}

export default class extends React.Component<Props> {
  static async getInitialProps({ query, res }) {
    if (query.route !== "login" && query.route !== "register") {
      res.statusCode = 404;
    }
    return { path: query.route };
  }

  render() {
    const { path } = this.props;
    return (
      <React.Fragment>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-info py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">Rota Dashboard!</h1>
                    <p className="text-lead text-light">
                      Rota Administration Panel is only accessible by Adminstrators & Super Administrator.
                    </p>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              {path === "login" ? <Login /> : <Register />}
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </React.Fragment>
    );
  }
}
