import gql from "graphql-tag";
import { AreaBasicFragment } from "../area/fragements";
import { RoleBasicFragment } from "../role/fragments";
import { UserBasicFragment } from "../user/fragements";

export const ScheduleBasicFragment = gql`
  fragment ScheduleBasicFragment on Schedule {
    id
    startTime
    endTime
    coreShift
    locumShift
    staffName
    notes
    staff {
      ...UserBasicFragment
    }
    role {
      ...RoleBasicFragment
    }
    area {
      ...AreaBasicFragment
    }
  }
  ${UserBasicFragment}
  ${RoleBasicFragment}
  ${AreaBasicFragment}
`;
