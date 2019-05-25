import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const getMySchedules = gql`
  query GetMySchedules($startDay: Float!) {
    getMySchedules(startDay: $startDay) {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
