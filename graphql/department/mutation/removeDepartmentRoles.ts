import gql from "graphql-tag";

export const RemoveDepartmentRolesMutation = gql`
  mutation RemoveDepartmentRoles($data: AssignDepartmentRolesInput!) {
    removeDepartmentRoles(data: $data)
  }
`;
