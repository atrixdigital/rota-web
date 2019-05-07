import * as React from "react";
import Link from "next/link";
// nodejs library to set properties for components

// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

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
  routes?: any[];
  logo: Logo;
}

class Sidebar extends React.Component<Props, State> {
  state = {
    collapseOpen: false
  };
  // constructor(props) {
  //   super(props);
  //   // this.activeRoute.bind(this);
  // }
  // // verifies if routeName is the one active (in browser input)
  // activeRoute(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  // }
  // toggles collapse between opened and closed (true/false)
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
  // creates the links that appear in the left menu / Sidebar
  createLinks = routes => {
    return routes.map((prop, key) => {
      return (
        <NavItem key={key}>
          <Link href={`/crud${prop.path}`}>
            <NavLink onClick={this.closeCollapse} activeClassName="active">
              {prop.icon && <i className={prop.icon} />}
              {prop.title}
            </NavLink>
          </Link>
        </NavItem>
      );
    });
  };
  render() {
    const { routes, logo } = this.props;
    // let navbarBrandProps;
    // if (logo && logo.innerLink) {
    //   navbarBrandProps = {
    //     to: logo.innerLink,
    //     tag: Link
    //   };
    // } else if (logo && logo.outterLink) {
    //   navbarBrandProps = {
    //     href: logo.outterLink,
    //     target: "_blank"
    //   };
    // }
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
            <NavbarBrand className="pt-0">
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
            </NavbarBrand>
          ) : null}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("../../static/assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <Link href="/admin/user-profile">
                  <DropdownItem>
                    <i className="ni ni-single-02" />
                    <span>My profile</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/user-profile">
                  <DropdownItem>
                    <i className="ni ni-settings-gear-65" />
                    <span>Settings</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/user-profile">
                  <DropdownItem>
                    <i className="ni ni-calendar-grid-58" />
                    <span>Activity</span>
                  </DropdownItem>
                </Link>
                <Link href="/admin/user-profile">
                  <DropdownItem>
                    <i className="ni ni-support-16" />
                    <span>Support</span>
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
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
                    Dashboard
                  </NavLink>
                </Link>
              </NavItem>
              {this.createLinks(routes)}
            </Nav>
            <hr className="my-3" />
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
              {/* <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/documentation/alerts?ref=adr-admin-sidebar">
                  <i className="ni ni-ui-04" />
                  Components
                </NavLink>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Sidebar;
