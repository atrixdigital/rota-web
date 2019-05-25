import gql from "graphql-tag";

export const RemoveDepartmentAreasMutation = gql`
  mutation removeDepartmentAreas($data: AssignDepartmentAreasInput!) {
    removeDepartmentAreas(data: $data)
  }
`;
