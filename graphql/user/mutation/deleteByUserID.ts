import gql from "graphql-tag";

export const DeleteByUserIDMutaion = gql`
  mutation DeleteByUserID($data: String!) {
    deleteByUserID(id: $data)
  }
`;
