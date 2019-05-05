import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";

export const getAllUser = gql`
  query GetAllUser {
    getAllUser {
      ...UserBasicFragment
    }
  }
  ${UserBasicFragment}
`;
