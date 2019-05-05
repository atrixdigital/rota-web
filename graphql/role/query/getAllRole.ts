import gql from "graphql-tag";
import { RoleBasicFragment } from "../fragments";

export const getAllRole = gql`
  query GetAllRole {
    getAllRole {
      ...RoleBasicFragment
    }
  }
  ${RoleBasicFragment}
`;
