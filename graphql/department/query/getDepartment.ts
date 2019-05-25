import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const getDepartment = gql`
  query GetDepartment($id: String!) {
    getDepartment(id: $id) {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
