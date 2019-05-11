import gql from "graphql-tag";

export const ApprovedUserMutaion = gql`
  mutation ApprovedUser($approved: Boolean!, $userID: String!) {
    approvedUser(approved: $approved, userID: $userID)
  }
`;
