import gql from "graphql-tag";

export const getAllRoleNoAuth = gql`
  query GetAllRoleNoAuth {
    getAllRoleNoAuth {
      id
      title
    }
  }
`;
