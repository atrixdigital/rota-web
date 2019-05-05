import gql from "graphql-tag";

export const DeleteByRoleIDMutaion = gql`
  mutation DeleteByRoleID($data: String!) {
    deleteByRoleID(id: $data)
  }
`;
