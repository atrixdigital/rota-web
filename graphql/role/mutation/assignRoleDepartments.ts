import gql from "graphql-tag";
import { RoleBasicFragment } from "../fragments";

export const AssignRoleDepartmentsMutaion = gql`
  mutation AssignRoleDepartments($data: AssignRoleDepartmentsInput!) {
    assignRoleDepartments(data: $data) {
      ...RoleBasicFragment
    }
  }
  ${RoleBasicFragment}
`;
