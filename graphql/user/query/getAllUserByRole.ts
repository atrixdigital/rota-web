import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";
import { RoleBasicFragment } from "../../role/fragments";

export const getAllUserByRole = gql`
  query GetAllUserByRole($data: GetUserByRoleInput) {
    getAllUserByRole(data: $data) {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }
  ${UserBasicFragment}
  ${RoleBasicFragment}
`;
