// javascipt plugin for creating charts
import React, { Component } from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import { MeMe } from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";

interface Props {
  me?: MeMe;
}

class MyDepartment extends Component<Props> {
  render() {
    const { me } = this.props;
    return (
      <AdminLayout pageTitle="My Department" me={me}>
        <Header />
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5" xl="12" />
          </Row>
        </Container>
      </AdminLayout>
    );
  }
}

export default withAuth(MyDepartment);
