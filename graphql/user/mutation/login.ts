import gql from "graphql-tag";

export const RegisterMutaion = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
