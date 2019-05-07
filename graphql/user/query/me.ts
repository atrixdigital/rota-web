import gql from "graphql-tag";
import { UserBasicFragment } from "../fragements";

export const meQuery = gql`
  query Me {
    me {
      ...UserBasicFragment
    }
  }
  ${UserBasicFragment}
`;
