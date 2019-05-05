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

export interface ChangePasswordInput {
  token: string;

  password: string;
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

export type GetAllDepartmentGetAllDepartment = {
  __typename?: "Department";

  user: Maybe<GetAllDepartmentUser>;
} & DepartmentBasicFragmentFragment;

export type GetAllDepartmentUser = {
  __typename?: "User";

  id: string;

  name: string;
};

export type GetAllRoleNoAuthVariables = {};

export type GetAllRoleNoAuthQuery = {
  __typename?: "Query";

  getAllRoleNoAuth: GetAllRoleNoAuthGetAllRoleNoAuth[];
};

export type GetAllRoleNoAuthGetAllRoleNoAuth = {
  __typename?: "Role";

  id: string;

  title: string;
};

export type ConfirmUserVariables = {
  token: string;
};

export type ConfirmUserMutation = {
  __typename?: "Mutation";

  confirmUser: boolean;
};

export type LoginVariables = {
  email: string;
  password: string;
};

export type LoginMutation = {
  __typename?: "Mutation";

  login: Maybe<LoginLogin>;
};

export type LoginLogin = {
  __typename?: "User";

  id: string;

  name: string;

  email: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterVariables = {
  data: CreateUserInput;
};

export type RegisterMutation = {
  __typename?: "Mutation";

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: "User";

  id: string;

  name: string;

  email: string;
};

export type GetAllUserVariables = {};

export type GetAllUserQuery = {
  __typename?: "Query";

  getAllUser: GetAllUserGetAllUser[];
};

export type GetAllUserGetAllUser = {
  __typename?: "User";

  id: string;

  name: string;
};

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
      user {
        id
        name
      }
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
export const GetAllRoleNoAuthDocument = gql`
  query GetAllRoleNoAuth {
    getAllRoleNoAuth {
      id
      title
    }
  }
`;
export class GetAllRoleNoAuthComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllRoleNoAuthQuery, GetAllRoleNoAuthVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllRoleNoAuthQuery, GetAllRoleNoAuthVariables>
        query={GetAllRoleNoAuthDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllRoleNoAuthProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllRoleNoAuthQuery, GetAllRoleNoAuthVariables>
> &
  TChildProps;
export function GetAllRoleNoAuthHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllRoleNoAuthQuery,
        GetAllRoleNoAuthVariables,
        GetAllRoleNoAuthProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllRoleNoAuthQuery,
    GetAllRoleNoAuthVariables,
    GetAllRoleNoAuthProps<TChildProps>
  >(GetAllRoleNoAuthDocument, operationOptions);
}
export const ConfirmUserDocument = gql`
  mutation ConfirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;
export class ConfirmUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<ConfirmUserMutation, ConfirmUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<ConfirmUserMutation, ConfirmUserVariables>
        mutation={ConfirmUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ConfirmUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ConfirmUserMutation, ConfirmUserVariables>
> &
  TChildProps;
export type ConfirmUserMutationFn = ReactApollo.MutationFn<
  ConfirmUserMutation,
  ConfirmUserVariables
>;
export function ConfirmUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ConfirmUserMutation,
        ConfirmUserVariables,
        ConfirmUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ConfirmUserMutation,
    ConfirmUserVariables,
    ConfirmUserProps<TChildProps>
  >(ConfirmUserDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginVariables
>;
export function LoginHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutation,
    LoginVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation Register($data: CreateUserInput!) {
    register(data: $data) {
      id
      name
      email
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const GetAllUserDocument = gql`
  query GetAllUser {
    getAllUser {
      id
      name
    }
  }
`;
export class GetAllUserComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAllUserQuery, GetAllUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAllUserQuery, GetAllUserVariables>
        query={GetAllUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllUserProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllUserQuery, GetAllUserVariables>
> &
  TChildProps;
export function GetAllUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllUserQuery,
        GetAllUserVariables,
        GetAllUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllUserQuery,
    GetAllUserVariables,
    GetAllUserProps<TChildProps>
  >(GetAllUserDocument, operationOptions);
}
