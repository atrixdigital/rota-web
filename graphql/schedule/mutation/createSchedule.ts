import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const CreateScheduleMutaion = gql`
  mutation CreateSchedule($data: CreateScheduleInput!) {
    createSchedule(data: $data) {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
