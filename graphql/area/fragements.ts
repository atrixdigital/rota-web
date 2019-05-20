import gql from "graphql-tag";

export const AreaBasicFragment = gql`
  fragment AreaBasicFragment on Area {
    id
    title
  }
`;
