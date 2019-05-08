import gql from "graphql-tag";

export const DeleteByScheduleIDMutaion = gql`
  mutation DeleteByScheduleID($data: String!) {
    deleteByScheduleID(id: $data)
  }
`;
