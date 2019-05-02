export type Maybe<T> = T | null;

export interface CreateUserInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  approved?: Maybe<boolean>;

  roleID: string;
}

export interface UpdateUserInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  approved?: Maybe<boolean>;

  roleID: string;
}

export interface CreateRoleInput {
  title: string;
}

export interface UpdateRoleInput {
  title: string;
}

export interface CreateDepartmentInput {
  title: string;

  email: string;

  phone: string;

  userID: string;
}

export interface UpdateDepartmentInput {
  title: string;

  email: string;

  phone: string;

  userID: string;
}

// ====================================================
// Documents
// ====================================================

export type GetAllDepartmentVariables = {};

export type GetAllDepartmentQuery = {
  __typename?: "Query";

  getAllDepartment: GetAllDepartmentGetAllDepartment[];
};

export type GetAllDepartmentGetAllDepartment = {
  __typename?: "Department";

  id: string;

  title: string;

  email: string;

  phone: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export const GetAllDepartmentDocument = gql`
  query GetAllDepartment {
    getAllDepartment {
      id
      title
      email
      phone
    }
  }
`;
export class GetAllDepartmentComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllDepartmentQuery, GetAllDepartmentVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllDepartmentQuery, GetAllDepartmentVariables>
        query={GetAllDepartmentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllDepartmentProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllDepartmentQuery, GetAllDepartmentVariables>
> &
  TChildProps;
export function GetAllDepartmentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllDepartmentQuery,
        GetAllDepartmentVariables,
        GetAllDepartmentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllDepartmentQuery,
    GetAllDepartmentVariables,
    GetAllDepartmentProps<TChildProps>
  >(GetAllDepartmentDocument, operationOptions);
}
