import gql from "graphql-tag";
import { RoleBasicFragment } from "../fragments";

export const CreateRoleMutaion = gql`
  mutation CreateRole($data: CreateRoleInput!) {
    createRole(data: $data) {
      ...RoleBasicFragment
    }
  }
  ${RoleBasicFragment}
`;
