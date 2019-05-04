import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const getAllDepartment = gql`
  query GetAllDepartment {
    getAllDepartment {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
