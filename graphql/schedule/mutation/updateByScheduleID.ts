import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const UpdateByScheduleIDMutaion = gql`
  mutation UpdateByScheduleID($id: String!, $data: UpdateScheduleInput!) {
    updateByScheduleID(id: $id, data: $data) {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
