import gql from "graphql-tag";

export const getAllDepartment = gql`
  query GetAllDepartment {
    getAllDepartment {
      id
      title
      email
      phone
    }
  }
`;
