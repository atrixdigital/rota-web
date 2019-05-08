import gql from "graphql-tag";
import { ScheduleBasicFragment } from "../fragements";

export const getAllSchedule = gql`
  query GetAllSchedule {
    getAllSchedule {
      ...ScheduleBasicFragment
    }
  }
  ${ScheduleBasicFragment}
`;
