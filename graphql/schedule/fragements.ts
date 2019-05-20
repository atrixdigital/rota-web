import gql from "graphql-tag";
import { UserBasicFragment } from "../user/fragements";

export const ScheduleBasicFragment = gql`
  fragment ScheduleBasicFragment on Schedule {
    id
    startTime
    endTime
    totalHours
    joinTime
    staff {
      ...UserBasicFragment
    }
  }
  ${UserBasicFragment}
`;
