// javascipt plugin for creating charts
import React, { Component } from "react";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Crud from "../components/Crud";
import Header from "../components/Headers/Header";
import Loader from "../components/Loader";
import {
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  GetMySchedulesComponent,
  MeMe,
  ScheduleBasicFragmentFragment
} from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";

interface Props {
  me?: MeMe;
}

interface InitialValue {
  startTime: Date;
  endTime: Date;
  startDay: number;
  notes: string;
  coreShift: string;
  staffID: string;
  roleID: string;
  areaID: string;
}

class DashBoard extends Component<Props> {
  render() {
    const { me } = this.props;
    return (
      <AdminLayout pageTitle="Dashboard" me={me}>
        <Header showCards={false} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <GetMySchedulesComponent
            variables={{ startDay: new Date().getDate() }}
            fetchPolicy="cache-and-network"
          >
            {({ data, loading }) => {
              if (loading) {
                return <Loader />;
              }
              return (
                <Row className="mt-5">
                  <Col className="mb-5" xl="12">
                    <Crud<ScheduleBasicFragmentFragment, InitialValue>
                      customSearchField="staff.name"
                      isFilters={true}
                      filters={{
                        isAreaFilter: true,
                        isTypeFilter: true
                      }}
                      renderTypes={() =>
                        me &&
                        me.department &&
                        me.department.roles &&
                        me.department.roles.length > 0
                          ? me.department.roles.map(({ id, title }) => {
                              return (
                                <option key={id} value={id}>
                                  {title}
                                </option>
                              );
                            })
                          : []
                      }
                      renderAreas={() =>
                        me &&
                        me.department &&
                        me.department.areas &&
                        me.department.areas.length > 0
                          ? me.department.areas.map(({ id, title }) => {
                              return (
                                <option key={id} value={id}>
                                  {title}
                                </option>
                              );
                            })
                          : []
                      }
                      pageTitle="Today's Routine"
                      items={
                        data && data.getMySchedules.length > 0
                          ? data.getMySchedules
                          : []
                      }
                      fields={[
                        "Name",
                        "Area",
                        "Designation",
                        "Start Time",
                        "End Time",
                        "Join Time",
                        "Status"
                      ]}
                      loading={false}
                      renderItem={({
                        id,
                        startTime,
                        endTime,
                        role,
                        area,
                        staff
                      }) => {
                        return (
                          <tr key={id}>
                            <RotaTableItemsTitle
                              title={staff && staff.name ? staff.name : "N/A"}
                            />
                            <RotaTableItemsSimple text={area.title} />
                            <RotaTableItemsSimple text={role.title} />
                            <RotaTableItemsSimple text={startTime} />
                            <RotaTableItemsSimple text={endTime} />
                            <RotaTableItemsSimple text="13:05" />
                            <RotaTableItemsSimple text="Active" />
                          </tr>
                        );
                      }}
                    />
                  </Col>
                </Row>
              );
            }}
          </GetMySchedulesComponent>
        </Container>
      </AdminLayout>
    );
  }
}

export default withAuth(DashBoard);
