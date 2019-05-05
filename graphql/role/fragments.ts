import gql from "graphql-tag";

export const RoleBasicFragment = gql`
  fragment RoleBasicFragment on Role {
    id
    title
  }
`;
