import gql from "graphql-tag";

export const ConfirmUserMutaion = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
