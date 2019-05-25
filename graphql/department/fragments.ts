import gql from "graphql-tag";

export const DepartmentBasicFragment = gql`
  fragment DepartmentBasicFragment on Department {
    id
    title
    email
    phone
    manager {
      id
      name
    }
    staffs {
      id
      name
    }
    roles {
      id
      title
    }
    areas {
      id
      title
    }
  }
`;
