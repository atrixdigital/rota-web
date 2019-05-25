import gql from "graphql-tag";
import { DepartmentBasicFragment } from "../fragments";

export const AssignDepartmentAreasMutation = gql`
  mutation AssignDepartmentAreas($data: AssignDepartmentAreasInput!) {
    assignDepartmentAreas(data: $data) {
      ...DepartmentBasicFragment
    }
  }
  ${DepartmentBasicFragment}
`;
