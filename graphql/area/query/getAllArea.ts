import gql from "graphql-tag";
import { AreaBasicFragment } from "../fragements";

export const getAllArea = gql`
  query GetAllArea {
    getAllArea {
      ...AreaBasicFragment
    }
  }
  ${AreaBasicFragment}
`;
