import Link from "next/link";
import Router from "next/router";
import * as React from "react";
// nodejs library to set properties for components
// reactstrap components
import {
  Col,
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Media,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import { LogoutComponent, MeMe } from "../../generated/apolloComponent";
import FlashMessage from "../../lib/FlashMessage";

interface State {
  collapseOpen: boolean;
}

interface Logo {
  innerLink?: string;
  outterLink?: string;
  imgSrc: string;
  imgAlt: string;
}

interface Props {
  logo: Logo;
  me?: MeMe;
}

class Sidebar extends React.Component<Props, State> {
  state = {
    collapseOpen: false
  };
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  render() {
    const { logo, me } = this.props;
    let nameAvatar: string = "";
    if (me) {
      nameAvatar = me.firstName[0].toUpperCase() + me.lastName[0].toUpperCase();
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {logo ? (
            <div className="side-bar-top-panel">
              <Link href="/">
                <NavbarBrand
                  className="pt-0"
                  style={{
                    fontSize: "45px",
                    margin: 0,
                    padding: 0
                  }}
                >
                  ROTA
                </NavbarBrand>
              </Link>
              <div className="top-panel">
                <Link href="/my-department">
                  <a>
                    <img
                      src={require("../../static/assets/img/icons/Icons/admin icon.png")}
                    />
                    <span>
                      Manager
                      {me && me.department ? `, ${me.department.title}` : ""}
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          ) : null}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {nameAvatar}
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Rota Dashboard</h6>
                </DropdownItem>
                <Link href="/dashboard">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <LogoutComponent>
                  {mutate => (
                    <DropdownItem
                      href=""
                      onClick={async e => {
                        e.preventDefault();
                        await mutate();
                        const flashMessage = new FlashMessage(
                          "Successfully Logout.",
                          "success"
                        );
                        flashMessage.show();
                        Router.push("/auth/login");
                      }}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  )}
                </LogoutComponent>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Collapse navbar isOpen={this.state.collapseOpen}>
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link href={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search"
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            <Nav navbar>
              <NavItem>
                <Link href={`/dashboard`}>
                  <NavLink
                    onClick={this.closeCollapse}
                    activeClassName="active"
                  >
                    <img
                      src={require("../../static/assets/img/icons/Icons/dash.png")}
                    />{" "}
                    Dashboard
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/manage-staff`}>
                  <NavLink
                    onClick={this.closeCollapse}
                    activeClassName="active"
                  >
                    <img
                      src={require("../../static/assets/img/icons/Icons/staff.png")}
                    />{" "}
                    Manage Staff
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/manage-schedule`}>
                  <NavLink
                    onClick={this.closeCollapse}
                    activeClassName="active"
                  >
                    <img
                      src={require("../../static/assets/img/icons/Icons/sch.png")}
                    />{" "}
                    Manage Schedule
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/manage-leaves`}>
                  <NavLink
                    onClick={this.closeCollapse}
                    activeClassName="active"
                  >
                    <img
                      src={require("../../static/assets/img/icons/Icons/leave.png")}
                    />{" "}
                    Manage Leaves
                  </NavLink>
                </Link>
              </NavItem>
              <LogoutComponent>
                {mutate => {
                  return (
                    <NavItem>
                      <NavLink
                        onClick={async e => {
                          e.preventDefault();
                          await mutate();
                          const flashMessage = new FlashMessage(
                            "Successfully Logout.",
                            "success"
                          );
                          flashMessage.show();
                          Router.push("/auth/login");
                        }}
                        activeClassName="active"
                      >
                        <img
                          src={require("../../static/assets/img/icons/Icons/sch.png")}
                        />{" "}
                        Logout
                      </NavLink>
                    </NavItem>
                  );
                }}
              </LogoutComponent>
              {/* {isAdmin(me) ? (
                <>
                  <NavItem>
                    <Link href={`/active-managers`}>
                      <NavLink onClick={this.closeCollapse}>
                        Active Rota Managers
                      </NavLink>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href={`/inactive-managers`}>
                      <NavLink onClick={this.closeCollapse}>
                        Inactive Rota Managers
                      </NavLink>
                    </Link>
                  </NavItem>
                </>
              ) : null}
              <NavItem>
                <Link href={`/active-staffs`}>
                  <NavLink onClick={this.closeCollapse}>
                    Active Rota Staffs
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/inactive-staffs`}>
                  <NavLink onClick={this.closeCollapse}>
                    Inactive Rota Staffs
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/departments`}>
                  <NavLink onClick={this.closeCollapse}>Departments</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/roles`}>
                  <NavLink onClick={this.closeCollapse}>Roles</NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/schedules`}>
                  <NavLink onClick={this.closeCollapse}>Schedules</NavLink>
                </Link>
              </NavItem> */}
            </Nav>
            {/* <hr className="my-3" />
            <h6 className="navbar-heading text-muted">Documentation</h6>
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/overview?ref=adr-admin-sidebar">
                  <i className="ni ni-spaceship" />
                  GraphQL API
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/colors?ref=adr-admin-sidebar">
                  <i className="ni ni-palette" />
                  Class Explorer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/alerts?ref=adr-admin-sidebar">
                  <i className="ni ni-ui-04" />
                  Components
                </NavLink>
              </NavItem>
            </Nav> */}
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Sidebar;
