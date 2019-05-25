import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../department/fragments";

export const UserBasicFragment = gql`
  fragment UserBasicFragment on User {
    id
    firstName
    lastName
    name
    email
    password
    phone
    appproved
    area {
      id
      title
    }
    department {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
