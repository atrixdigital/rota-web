import gql from "graphql-tag";

export const UserBasicFragment = gql`
  fragment UserBasicFragment on User {
    id
    firstName
    lastName
    name
    email
    password
    phone
    appproved
    area {
      id
      title
    }
  }
`;
