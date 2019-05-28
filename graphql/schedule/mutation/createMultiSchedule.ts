import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const CreateMultiScheduleMutaion = gql`
  mutation CreateMultiSchedule($data: [CreateScheduleInput!]!) {
    createMultiSchedule(data: $data) {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
