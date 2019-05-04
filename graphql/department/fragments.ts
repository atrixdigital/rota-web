import gql from "graphql-tag";

export const DepartmentBasicFragment = gql`
  fragment DepartmentBasicFragment on Department {
    id
    title
    email
    phone
  }
`;
