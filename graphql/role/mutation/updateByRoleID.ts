import gql from "graphql-tag";
import { RoleBasicFragment } from "../fragments";

export const UpdateByRoleIDMutaion = gql`
  mutation UpdateByRoleID($id: String!, $data: UpdateRoleInput!) {
    updateByRoleID(id: $id, data: $data) {
      ...RoleBasicFragment
    }
  }
  ${RoleBasicFragment}
`;
