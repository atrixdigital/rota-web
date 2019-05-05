import gql from "graphql-tag";

export const RegisterMutaion = gql`
  mutation Register($data: CreateUserInput!) {
    register(data: $data) {
      id
      name
      email
    }
  }
`;
