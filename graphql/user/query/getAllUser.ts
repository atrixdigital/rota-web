import gql from "graphql-tag";

export const getAllUser = gql`
  query GetAllUser {
    getAllUser {
      id
      name
    }
  }
`;
