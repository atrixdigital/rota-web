import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const AssignDepartmentRolesMutation = gql`
  mutation AssignDepartmentRoles($data: AssignDepartmentRolesInput!) {
    assignDepartmentRoles(data: $data) {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
