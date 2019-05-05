import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";

export const UpdateByUserIDMutaion = gql`
  mutation UpdateByUserID($id: String!, $data: UpdateUserInput!) {
    updateByUserID(id: $id, data: $data) {
      ...UserBasicFragment
    }
  }
  ${UserBasicFragment}
`;
