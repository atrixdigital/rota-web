// javascipt plugin for creating charts
import React, { Component } from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import {
  ApprovedUserMutationFn,
  CreateUserMutationFn,
  DeleteByUserIdMutationFn,
  GetAllAreaQuery,
  GetAllRoleNoAuthQuery,
  GetAllUserByFilterVariables,
  MeMe,
  UpdateByUserIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { withAuth } from "../lib/withAuth";

interface Props
  extends CrudProps<
    DeleteByUserIdMutationFn,
    UpdateByUserIdMutationFn,
    CreateUserMutationFn
  > {
  me?: MeMe;
  getAllRoleNoAuth: GetAllRoleNoAuthQuery;
  getAllArea: GetAllAreaQuery;
  approvedUser: ApprovedUserMutationFn;
  variables?: GetAllUserByFilterVariables;
}

class ManageSchedule extends Component<Props> {
  render() {
    const { me } = this.props;
    return (
      <AdminLayout pageTitle="Manage Schedule" me={me}>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5" xl="12">
              {/* <ScheduleFor {...this.props} /> */}
            </Col>
            {/* <Col className="mb-5" xl="12">
              <ApprovedStaffRequest {...this.props} />
            </Col> */}
          </Row>
        </Container>
      </AdminLayout>
    );
  }
}

// export default compose(
//   GetAllRoleNoAuthHOC({ name: "getAllRoleNoAuth" }),
//   GetAllAreaHOC({ name: "getAllArea" }),
//   DeleteByUserIdHOC({ name: "deleteBy" }),
//   UpdateByUserIdHOC({ name: "updateBy" }),
//   CreateUserHOC({ name: "create" }),
//   ApprovedUserHOC({ name: "approvedUser" })
// )(withAuth(ManageSchedule));

export default withAuth(ManageSchedule);
