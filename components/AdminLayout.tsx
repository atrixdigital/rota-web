import React, { Component } from "react";
import { Container } from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footers/AdminFooter";

class AdminLayout extends Component {
  render() {
    return (
      <>
        <Sidebar
          routes={[{}]}
          logo={{
            innerLink: "/dashboard",
            imgSrc: require("../static/assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar {...this.props} brandText="Dashboard" />
          {this.props.children}
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
  }
}

export default AdminLayout;