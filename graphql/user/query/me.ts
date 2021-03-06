import gql from "graphql-tag";
import { RoleBasicFragment } from "../../role/fragments";
import { UserBasicFragment } from "../fragements";

export const meQuery = gql`
  query Me {
    me {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }
  ${UserBasicFragment}
  ${RoleBasicFragment}
`;
