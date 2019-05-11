import React, { Component } from "react";
import { Container } from "reactstrap";
import { MeMe } from "../generated/apolloComponent";
import AdminFooter from "./Footers/AdminFooter";
import AdminNavbar from "./Navbars/AdminNavbar";
import Sidebar from "./Sidebar/Sidebar";

interface Props {
  pageTitle?: string;
  me?: MeMe;
}

class AdminLayout extends Component<Props> {
  render() {
    const { pageTitle, me } = this.props;
    return (
      <>
        <Sidebar
          me={me}
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
