import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";

export const CreateUserMutaion = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      ...UserBasicFragment
    }
  }
  ${UserBasicFragment}
`;
