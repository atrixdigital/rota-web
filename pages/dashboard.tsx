// javascipt plugin for creating charts
import Chart from "chart.js";
import Link from "next/link";
import React, { Component } from "react";
// reactstrap components
import { Button, Card, CardHeader, Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Header from "../components/Headers/Header";
import Loader from "../components/Loader";
import RotaTable from "../components/RotaTable/RotaTable";
import {
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  GetAllUserByFilterComponent,
  MeMe
} from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";
// core components
import { chartOptions, parseOptions } from "../variables/charts";

interface State {
  activeNav: number;
  chartExample1Data: string;
}

declare global {
  interface Window {
    Chart: any;
  }
}

interface Props {
  me?: MeMe;
}

class DashBoard extends Component<Props, State> {
  state: Readonly<State> = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  componentWillMount() {
    // if (window.Chart) {
    //   parseOptions(Chart, chartOptions());
    // }
    parseOptions(Chart, chartOptions());
  }

  toggleNavs = (e: any, index: number) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
    let wow = () => {
      console.log(this.state);
    };
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  render() {
    const { me } = this.props;
    return (
      <AdminLayout pageTitle="Dashboard" me={me}>
        <Header showCards={true} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className="text-white mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total orders</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row> */}
          <Row className="mt-5">
            <Col className="mb-5" xl="12">
              <ShowActiveAndInactiveStaff approved={true} />
            </Col>
            <Col xl="12">
              <ShowActiveAndInactiveStaff approved={false} />
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    );
  }
}

export default withAuth(DashBoard);

const ShowActiveAndInactiveStaff: React.SFC<{ approved: boolean }> = ({
  approved
}) => (
  <GetAllUserByFilterComponent
    variables={{
      data: {
        roleType: "Staff",
        approved
      }
    }}
    fetchPolicy="cache-and-network"
  >
    {({ data, loading }) => {
      return (
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">
                  {approved ? "Active" : "Inactive"} Staffs
                </h3>
              </div>
              {!loading ? (
                <div className="col text-right">
                  <Link href={approved ? "/active-staffs" : "/inactive-staffs"}>
                    <Button color="primary" size="sm">
                      See all
                    </Button>
                  </Link>
                </div>
              ) : null}
            </Row>
          </CardHeader>
          <RotaTable headings={["name", "email", "role"]}>
            {loading ? (
              <tr>
                <td colSpan={4}>
                  <Loader />
                </td>
              </tr>
            ) : data &&
              data.getAllUserByFilter &&
              data.getAllUserByFilter.length > 0 ? (
              data.getAllUserByFilter
                .slice(0, 5)
                .map(({ id, name, email, role }) => (
                  <tr key={id}>
                    <RotaTableItemsTitle title={name} />
                    <RotaTableItemsSimple text={email} />
                    <RotaTableItemsSimple text={role ? role.title : "N/A"} />
                  </tr>
                ))
            ) : (
              <tr>
                <RotaTableItemsSimple
                  text={`No ${approved ? "Active" : "Inactive"} Staff`}
                />
              </tr>
            )}
          </RotaTable>
        </Card>
      );
    }}
  </GetAllUserByFilterComponent>
);
