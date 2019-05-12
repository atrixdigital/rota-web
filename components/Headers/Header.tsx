import React from "react";
// reactstrap components
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import { GetAllUserByFilterComponent } from "../../generated/apolloComponent";
import Loader from "../Loader";

interface Props {
  showCards?: boolean;
}

class Header extends React.Component<Props> {
  render() {
    const { showCards } = this.props;
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {showCards && (
                <Row>
                  <Col lg="6" xl="3">
                    <GetAllUserByFilterComponent
                      variables={{
                        data: {
                          roleType: "Manager",
                          approved: true
                        }
                      }}
                      fetchPolicy="cache-and-network"
                    >
                      {({ data, loading }) => {
                        if (loading) {
                          return <Loader />;
                        }
                        return (
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h6"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Active Managers
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {data.getAllUserByFilter.length}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                    <i className="fas fa-chart-bar" />
                                  </div>
                                </Col>
                              </Row>
                              {/* <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fa fa-arrow-up" /> 3.48%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p> */}
                            </CardBody>
                          </Card>
                        );
                      }}
                    </GetAllUserByFilterComponent>
                  </Col>
                  <Col lg="6" xl="3">
                    <GetAllUserByFilterComponent
                      variables={{
                        data: {
                          roleType: "Manager",
                          approved: false
                        }
                      }}
                      fetchPolicy="cache-and-network"
                    >
                      {({ data, loading }) => {
                        if (loading) {
                          return <Loader />;
                        }
                        return (
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h6"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Inactive Managers
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {data.getAllUserByFilter.length}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                    <i className="fas fa-chart-pie" />
                                  </div>
                                </Col>
                              </Row>
                              {/* <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-danger mr-2">
                            <i className="fas fa-arrow-down" /> 3.48%
                          </span>{" "}
                          <span className="text-nowrap">Since last week</span>
                        </p> */}
                            </CardBody>
                          </Card>
                        );
                      }}
                    </GetAllUserByFilterComponent>
                  </Col>
                  <Col lg="6" xl="3">
                    <GetAllUserByFilterComponent
                      fetchPolicy="cache-and-network"
                      variables={{
                        data: {
                          roleType: "Staff",
                          approved: true
                        }
                      }}
                    >
                      {({ data, loading }) => {
                        if (loading) {
                          return <Loader />;
                        }
                        return (
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h6"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Active Staffs
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {data.getAllUserByFilter.length}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                    <i className="fas fa-users" />
                                  </div>
                                </Col>
                              </Row>
                              {/* <p className="mt-3 mb-0 text-muted text-sm">
                          <span className="text-warning mr-2">
                            <i className="fas fa-arrow-down" /> 1.10%
                          </span>{" "}
                          <span className="text-nowrap">Since yesterday</span>
                        </p> */}
                            </CardBody>
                          </Card>
                        );
                      }}
                    </GetAllUserByFilterComponent>
                  </Col>
                  <Col lg="6" xl="3">
                    <GetAllUserByFilterComponent
                      variables={{
                        data: {
                          roleType: "Staff",
                          approved: false
                        }
                      }}
                      fetchPolicy="cache-and-network"
                    >
                      {({ data, loading }) => {
                        if (loading) {
                          return <Loader />;
                        }
                        return (
                          <Card className="card-stats mb-4 mb-xl-0">
                            <CardBody>
                              <Row>
                                <div className="col">
                                  <CardTitle
                                    tag="h6"
                                    className="text-uppercase text-muted mb-0"
                                  >
                                    Inactive Staffs
                                  </CardTitle>
                                  <span className="h2 font-weight-bold mb-0">
                                    {data.getAllUserByFilter.length}
                                  </span>
                                </div>
                                <Col className="col-auto">
                                  <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                    <i className="fas fa-percent" />
                                  </div>
                                </Col>
                              </Row>
                              {/* <p className="mt-3 mb-0 text-muted text-sm">
                                <span className="text-success mr-2">
                                  <i className="fas fa-arrow-up" /> 12%
                                </span>{" "}
                                <span className="text-nowrap">
                                  Since last month
                                </span>
                              </p> */}
                            </CardBody>
                          </Card>
                        );
                      }}
                    </GetAllUserByFilterComponent>
                  </Col>
                </Row>
              )}
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
