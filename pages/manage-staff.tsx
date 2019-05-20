// javascipt plugin for creating charts
import React, { Component } from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import {
  GetAllUserByFilterVariables,
  MeMe
} from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";
import Users from "../views/Users";

interface Props {
  me?: MeMe;
}

class ManageStaff extends Component<Props> {
  render() {
    const { me } = this.props;
    console.log(me);
    return (
      <AdminLayout pageTitle="Manage Staff" me={me}>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5" xl="12">
              <RegisteredStaff me={me} />
            </Col>
            <Col className="mb-5" xl="12">
              <ApprovedStaffRequest me={me} />
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    );
  }
}

export default withAuth(ManageStaff);

class RegisteredStaff extends Component<Props> {
  render() {
    const { me } = this.props;
    const variables: GetAllUserByFilterVariables = {
      data: {
        roleType: "*",
        approved: true
      }
    };
    return (
      <Users
        me={me}
        pageTitle="Registered Staff"
        variables={variables}
        isFilters={true}
        filters={{
          isAreaFilter: true,
          isTypeFilter: true
        }}
        isUpdate={true}
        isDelete={true}
      />
    );
  }
}
class ApprovedStaffRequest extends Component<Props> {
  render() {
    const { me } = this.props;
    const variables: GetAllUserByFilterVariables = {
      data: {
        roleType: "*",
        approved: false
      }
    };
    return (
      <Users
        me={me}
        pageTitle="Approved Staff Request"
        variables={variables}
        isCreate={true}
        isApprove={true}
        isDecline={true}
      />
    );
  }
}
