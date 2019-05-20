import React, { Component } from "react";
import {
  GetAllUserByFilterVariables,
  UserBasicFragmentFragment
} from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";
import Users from "../views/Users";

interface Props {
  me: UserBasicFragmentFragment;
}

class ActiveStaffs extends Component<Props> {
  render() {
    const { me } = this.props;
    const variables: GetAllUserByFilterVariables = {
      data: {
        roleType: "Staff",
        approved: true
      }
    };
    return <Users me={me} pageTitle="Active Staffs" variables={variables} />;
  }
}

export default withAuth(ActiveStaffs);
