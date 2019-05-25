import gql from "graphql-tag";
import { AreaBasicFragment } from "../fragements";

export const AssignAreaDepartmentsMutaion = gql`
  mutation AssignAreaDepartments($data: AssignAreaDepartmentsInput!) {
    assignAreaDepartments(data: $data) {
      ...AreaBasicFragment
    }
  }
  ${AreaBasicFragment}
`;
