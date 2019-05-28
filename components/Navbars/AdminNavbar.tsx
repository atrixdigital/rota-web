import Link from "next/link";
import Router from "next/router";
import React from "react";
// reactstrap components
import {
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Navbar,
  UncontrolledDropdown
} from "reactstrap";
import { LogoutComponent, MeMe } from "../../generated/apolloComponent";
import FlashMessage from "../../lib/FlashMessage";

interface Props {
  brandText: string;
  me?: MeMe;
}

class AdminNavbar extends React.Component<Props> {
  render() {
    const { me } = this.props;
    let nameAvatar: string = "";
    if (me) {
      nameAvatar = me.firstName[0].toUpperCase() + me.lastName[0].toUpperCase();
    }
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <span className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {this.props.brandText}
            </span>
            {/* <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form> */}
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      {nameAvatar}
                      {/* <img
                        alt="..."
                        src={require("../../static/assets/img/theme/team-4-800x800.jpg")}
                      /> */}
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {me && me.name}
                      </span>
                    </Media>
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
          </Container>
        </Navbar>
      </>
    );
  }
}

export default AdminNavbar;
