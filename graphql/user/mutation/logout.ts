import gql from "graphql-tag";

export const LogoutMutaion = gql`
  mutation Logout {
    logout
  }
`;
