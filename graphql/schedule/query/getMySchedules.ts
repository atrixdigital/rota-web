import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const getMySchedules = gql`
  query GetMySchedules($startDate: Float!) {
    getMySchedules(startDate: $startDate) {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
