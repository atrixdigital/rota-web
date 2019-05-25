// javascipt plugin for creating charts
import React, { Component } from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import Loader from "../components/Loader";
import { GetDepartmentComponent, MeMe } from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";
import DepartmentAreas from "../modules/department/components/DepartmentAreas";
import DepartmentRoles from "../modules/department/components/DepartmentRoles";

interface Props {
  me?: MeMe;
}

class MyDepartment extends Component<Props> {
  render() {
    const { me } = this.props;
    let isDepartment = false;
    if (me && me.department) {
      isDepartment = true;
    }
    return (
      <AdminLayout pageTitle="My Department" me={me}>
        <Header />
        <Container className="mt--7" fluid>
          {isDepartment && (
            <GetDepartmentComponent
              variables={{ id: me.department.id }}
              fetchPolicy="cache-and-network"
            >
              {({ data, loading, refetch }) => {
                if (loading) {
                  return <Loader />;
                }
                return (
                  <Row className="mt-5">
                    <Col className="mb-5" xl="12">
                      <DepartmentRoles
                        department={me.department}
                        roles={data.getDepartment.roles}
                        refetch={refetch}
                      />
                    </Col>
                    <Col className="mb-5" xl="12">
                      <DepartmentAreas
                        department={me.department}
                        areas={data.getDepartment.areas}
                        refetch={refetch}
                      />
                    </Col>
                  </Row>
                );
              }}
            </GetDepartmentComponent>
          )}
        </Container>
      </AdminLayout>
    );
  }
}

export default withAuth(MyDepartment);
