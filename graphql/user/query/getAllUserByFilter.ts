import gql from "graphql-tag";
import { RoleBasicFragment } from "../../role/fragments";
import { UserBasicFragment } from "../fragements";

export const getAllUserByFilter = gql`
  query GetAllUserByFilter($data: GetUserByFilterInput) {
    getAllUserByFilter(data: $data) {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }
  ${UserBasicFragment}
  ${RoleBasicFragment}
`;
