import * as React from "react";
import Layout from "../components/Layout";
import AuthNavbar from "../components/Navbars/AuthNavbar";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import AuthFooter from "../components/Footers/AuthFooter";

export default () => {
  return (
    <React.Fragment>
      <div className="main-content">
        <AuthNavbar />
        <div className="header bg-gradient-info py-7 py-lg-8">
          <Container>
            <div className="header-body text-center mb-7">
              <Row className="justify-content-center">
                <Col lg="5" md="6">
                  <h1 className="text-white">Welcome!</h1>
                  <p className="text-lead text-light">
                    Use these awesome forms to login or create new account in
                    your project for free.
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Layout bodyClass="bg-default">
              <Col lg="6" md="8">
                <Card className="bg-secondary shadow border-0">
                  <CardBody className="px-lg-5 py-lg-5">
                    check your email to confirm your account
                  </CardBody>
                </Card>
              </Col>
            </Layout>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </React.Fragment>
  );
};
