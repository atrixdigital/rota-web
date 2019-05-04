import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const UpdateByDepartmentIDMutaion = gql`
  mutation UpdateByDepartmentID($id: String!, $data: UpdateDepartmentInput!) {
    updateByDepartmentID(id: $id, data: $data) {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
