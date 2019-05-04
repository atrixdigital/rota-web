import gql from "graphql-tag";

export const DeleteByDepartmentIDMutaion = gql`
  mutation DeleteByDepartmentID($data: String!) {
    deleteByDepartmentID(id: $data)
  }
`;
