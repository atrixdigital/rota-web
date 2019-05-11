import React, { Component } from "react";
import {
  GetAllUserByFilterVariables,
  UserBasicFragmentFragment
} from "../generated/apolloComponent";
import { withAuth } from "../lib/withAuth";
import Users from "../views/users";

interface Props {
  me: UserBasicFragmentFragment;
}

class ActiveManagers extends Component<Props> {
  render() {
    const { me } = this.props;
    const variables: GetAllUserByFilterVariables = {
      data: {
        roleType: "Manager",
        approved: true
      }
    };
    return <Users me={me} pageTitle="Active Managers" variables={variables} />;
  }
}

export default withAuth(ActiveManagers);
