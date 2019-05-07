import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";
import { RoleBasicFragment } from "../../role/fragments";

export const getAllUser = gql`
  query GetAllUser {
    getAllUser {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }
  ${UserBasicFragment}
  ${RoleBasicFragment}
`;
