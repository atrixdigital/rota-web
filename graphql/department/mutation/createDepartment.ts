import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const CreateDepartmentMutaion = gql`
  mutation CreateDepartment($data: CreateDepartmentInput!) {
    createDepartment(data: $data) {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
