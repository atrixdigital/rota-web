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

class InactiveManagers extends Component<Props> {
  render() {
    const { me } = this.props;
    const variables: GetAllUserByFilterVariables = {
      data: {
        roleType: "Manager",
        approved: false
      }
    };
    return (
      <Users me={me} pageTitle="Inactive Managers" variables={variables} />
    );
  }
}

export default withAuth(InactiveManagers);
