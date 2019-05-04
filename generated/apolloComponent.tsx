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

export type CreateDepartmentVariables = {
  data: CreateDepartmentInput;
};

export type CreateDepartmentMutation = {
  __typename?: "Mutation";

  createDepartment: CreateDepartmentCreateDepartment;
};

export type CreateDepartmentCreateDepartment = DepartmentBasicFragmentFragment;

export type DeleteByDepartmentIdVariables = {
  data: string;
};

export type DeleteByDepartmentIdMutation = {
  __typename?: "Mutation";

  deleteByDepartmentID: boolean;
};

export type UpdateByDepartmentIdVariables = {
  id: string;
  data: UpdateDepartmentInput;
};

export type UpdateByDepartmentIdMutation = {
  __typename?: "Mutation";

  updateByDepartmentID: UpdateByDepartmentIdUpdateByDepartmentId;
};

export type UpdateByDepartmentIdUpdateByDepartmentId = DepartmentBasicFragmentFragment;

export type GetAllDepartmentVariables = {};

export type GetAllDepartmentQuery = {
  __typename?: "Query";

  getAllDepartment: GetAllDepartmentGetAllDepartment[];
};

export type GetAllDepartmentGetAllDepartment = DepartmentBasicFragmentFragment;

export type DepartmentBasicFragmentFragment = {
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
// Fragments
// ====================================================

export const DepartmentBasicFragmentFragmentDoc = gql`
  fragment DepartmentBasicFragment on Department {
    id
    title
    email
    phone
  }
`;

// ====================================================
// Components
// ====================================================

export const CreateDepartmentDocument = gql`
  mutation CreateDepartment($data: CreateDepartmentInput!) {
    createDepartment(data: $data) {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;
export class CreateDepartmentComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateDepartmentMutation,
      CreateDepartmentVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateDepartmentMutation, CreateDepartmentVariables>
        mutation={CreateDepartmentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateDepartmentProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateDepartmentMutation, CreateDepartmentVariables>
> &
  TChildProps;
export type CreateDepartmentMutationFn = ReactApollo.MutationFn<
  CreateDepartmentMutation,
  CreateDepartmentVariables
>;
export function CreateDepartmentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateDepartmentMutation,
        CreateDepartmentVariables,
        CreateDepartmentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateDepartmentMutation,
    CreateDepartmentVariables,
    CreateDepartmentProps<TChildProps>
  >(CreateDepartmentDocument, operationOptions);
}
export const DeleteByDepartmentIdDocument = gql`
  mutation DeleteByDepartmentID($data: String!) {
    deleteByDepartmentID(id: $data)
  }
`;
export class DeleteByDepartmentIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteByDepartmentIdMutation,
      DeleteByDepartmentIdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteByDepartmentIdMutation,
        DeleteByDepartmentIdVariables
      >
        mutation={DeleteByDepartmentIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteByDepartmentIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeleteByDepartmentIdMutation,
    DeleteByDepartmentIdVariables
  >
> &
  TChildProps;
export type DeleteByDepartmentIdMutationFn = ReactApollo.MutationFn<
  DeleteByDepartmentIdMutation,
  DeleteByDepartmentIdVariables
>;
export function DeleteByDepartmentIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteByDepartmentIdMutation,
        DeleteByDepartmentIdVariables,
        DeleteByDepartmentIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteByDepartmentIdMutation,
    DeleteByDepartmentIdVariables,
    DeleteByDepartmentIdProps<TChildProps>
  >(DeleteByDepartmentIdDocument, operationOptions);
}
export const UpdateByDepartmentIdDocument = gql`
  mutation UpdateByDepartmentID($id: String!, $data: UpdateDepartmentInput!) {
    updateByDepartmentID(id: $id, data: $data) {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;
export class UpdateByDepartmentIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateByDepartmentIdMutation,
      UpdateByDepartmentIdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateByDepartmentIdMutation,
        UpdateByDepartmentIdVariables
      >
        mutation={UpdateByDepartmentIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateByDepartmentIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateByDepartmentIdMutation,
    UpdateByDepartmentIdVariables
  >
> &
  TChildProps;
export type UpdateByDepartmentIdMutationFn = ReactApollo.MutationFn<
  UpdateByDepartmentIdMutation,
  UpdateByDepartmentIdVariables
>;
export function UpdateByDepartmentIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateByDepartmentIdMutation,
        UpdateByDepartmentIdVariables,
        UpdateByDepartmentIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateByDepartmentIdMutation,
    UpdateByDepartmentIdVariables,
    UpdateByDepartmentIdProps<TChildProps>
  >(UpdateByDepartmentIdDocument, operationOptions);
}
export const GetAllDepartmentDocument = gql`
  query GetAllDepartment {
    getAllDepartment {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
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
