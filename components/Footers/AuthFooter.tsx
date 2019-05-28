/*eslint-disable*/
import React from "react";
// reactstrap components
import { Col, Container, Nav, NavItem, NavLink, Row } from "reactstrap";

class AuthFooter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer className="py-5">
          <Container>
            <Row className="align-items-center justify-content-xl-between">
              <Col xl="6">
                <div className="copyright text-center text-xl-left text-muted">
                  © 2019{" "}
                  <a
                    className="font-weight-bold ml-1"
                    href="https://www.creative-tim.com?ref=adr-auth-footer"
                    target="_blank"
                  >
                    Tech Masters
                  </a>
                </div>
              </Col>
              <Col xl="6">
                <Nav className="nav-footer justify-content-center justify-content-xl-end">
                  <NavItem>
                    <NavLink
                      href="https://www.creative-tim.com?ref=adr-auth-footer"
                      target="_blank"
                    >
                      Tech Masters
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </React.Fragment>
    );
  }
}

export default AuthFooter;
