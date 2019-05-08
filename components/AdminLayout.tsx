import React, { Component } from "react";
import { Container } from "reactstrap";
import Sidebar from "./Sidebar/Sidebar";
import AdminNavbar from "./Navbars/AdminNavbar";
import AdminFooter from "./Footers/AdminFooter";
import { dynamicRoutes } from "../shared/dynamicRoutes";

interface Props {
  pageTitle?: string;
}

class AdminLayout extends Component<Props> {
  render() {
    const { pageTitle } = this.props;
    return (
      <>
        <Sidebar
          routes={dynamicRoutes}
          logo={{
            innerLink: "/dashboard",
            imgSrc: require("../static/assets/img/brand/logo.jpeg"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...this.props}
            brandText={`${pageTitle ? pageTitle : "Dashboard"}`}
          />
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
