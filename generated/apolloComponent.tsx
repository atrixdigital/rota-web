export type Maybe<T> = T | null;

export interface GetUserByRoleInput {
  roleType: string;
}

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

export interface CreateScheduleInput {
  startTime: string;

  endTime: string;

  totalHours: number;

  userID: string;
}

export interface UpdateScheduleInput {
  startTime: string;

  endTime: string;

  totalHours: number;

  userID: string;
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

export type CreateRoleVariables = {
  data: CreateRoleInput;
};

export type CreateRoleMutation = {
  __typename?: "Mutation";

  createRole: CreateRoleCreateRole;
};

export type CreateRoleCreateRole = RoleBasicFragmentFragment;

export type DeleteByRoleIdVariables = {
  data: string;
};

export type DeleteByRoleIdMutation = {
  __typename?: "Mutation";

  deleteByRoleID: boolean;
};

export type UpdateByRoleIdVariables = {
  id: string;
  data: UpdateRoleInput;
};

export type UpdateByRoleIdMutation = {
  __typename?: "Mutation";

  updateByRoleID: UpdateByRoleIdUpdateByRoleId;
};

export type UpdateByRoleIdUpdateByRoleId = RoleBasicFragmentFragment;

export type GetAllRoleVariables = {};

export type GetAllRoleQuery = {
  __typename?: "Query";

  getAllRole: GetAllRoleGetAllRole[];
};

export type GetAllRoleGetAllRole = RoleBasicFragmentFragment;

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

export type CreateScheduleVariables = {
  data: CreateScheduleInput;
};

export type CreateScheduleMutation = {
  __typename?: "Mutation";

  createSchedule: CreateScheduleCreateSchedule;
};

export type CreateScheduleCreateSchedule = ScheduleBasicFragmentFragment;

export type DeleteByScheduleIdVariables = {
  data: string;
};

export type DeleteByScheduleIdMutation = {
  __typename?: "Mutation";

  deleteByScheduleID: boolean;
};

export type UpdateByScheduleIdVariables = {
  id: string;
  data: UpdateScheduleInput;
};

export type UpdateByScheduleIdMutation = {
  __typename?: "Mutation";

  updateByScheduleID: UpdateByScheduleIdUpdateByScheduleId;
};

export type UpdateByScheduleIdUpdateByScheduleId = ScheduleBasicFragmentFragment;

export type GetAllScheduleVariables = {};

export type GetAllScheduleQuery = {
  __typename?: "Query";

  getAllSchedule: GetAllScheduleGetAllSchedule[];
};

export type GetAllScheduleGetAllSchedule = ScheduleBasicFragmentFragment;

export type ConfirmUserVariables = {
  token: string;
};

export type ConfirmUserMutation = {
  __typename?: "Mutation";

  confirmUser: boolean;
};

export type CreateUserVariables = {
  data: CreateUserInput;
};

export type CreateUserMutation = {
  __typename?: "Mutation";

  createUser: CreateUserCreateUser;
};

export type CreateUserCreateUser = UserBasicFragmentFragment;

export type DeleteByUserIdVariables = {
  data: string;
};

export type DeleteByUserIdMutation = {
  __typename?: "Mutation";

  deleteByUserID: boolean;
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

export type UpdateByUserIdVariables = {
  id: string;
  data: UpdateUserInput;
};

export type UpdateByUserIdMutation = {
  __typename?: "Mutation";

  updateByUserID: UpdateByUserIdUpdateByUserId;
};

export type UpdateByUserIdUpdateByUserId = UserBasicFragmentFragment;

export type GetAllUserVariables = {};

export type GetAllUserQuery = {
  __typename?: "Query";

  getAllUser: GetAllUserGetAllUser[];
};

export type GetAllUserGetAllUser = {
  __typename?: "User";

  role: Maybe<GetAllUserRole>;
} & UserBasicFragmentFragment;

export type GetAllUserRole = RoleBasicFragmentFragment;

export type GetAllUserByRoleVariables = {
  data?: Maybe<GetUserByRoleInput>;
};

export type GetAllUserByRoleQuery = {
  __typename?: "Query";

  getAllUserByRole: GetAllUserByRoleGetAllUserByRole[];
};

export type GetAllUserByRoleGetAllUserByRole = {
  __typename?: "User";

  role: Maybe<GetAllUserByRoleRole>;
} & UserBasicFragmentFragment;

export type GetAllUserByRoleRole = RoleBasicFragmentFragment;

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserBasicFragmentFragment;

export type DepartmentBasicFragmentFragment = {
  __typename?: "Department";

  id: string;

  title: string;

  email: string;

  phone: string;
};

export type RoleBasicFragmentFragment = {
  __typename?: "Role";

  id: string;

  title: string;
};

export type ScheduleBasicFragmentFragment = {
  __typename?: "Schedule";

  id: string;

  startTime: string;

  endTime: string;

  totalHours: number;

  user: Maybe<ScheduleBasicFragmentUser>;
};

export type ScheduleBasicFragmentUser = UserBasicFragmentFragment;

export type UserBasicFragmentFragment = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  email: string;

  password: string;

  appproved: Maybe<boolean>;
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

export const RoleBasicFragmentFragmentDoc = gql`
  fragment RoleBasicFragment on Role {
    id
    title
  }
`;

export const UserBasicFragmentFragmentDoc = gql`
  fragment UserBasicFragment on User {
    id
    firstName
    lastName
    name
    email
    password
    appproved
  }
`;

export const ScheduleBasicFragmentFragmentDoc = gql`
  fragment ScheduleBasicFragment on Schedule {
    id
    startTime
    endTime
    totalHours
    user {
      ...UserBasicFragment
    }
  }

  ${UserBasicFragmentFragmentDoc}
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
export const CreateRoleDocument = gql`
  mutation CreateRole($data: CreateRoleInput!) {
    createRole(data: $data) {
      ...RoleBasicFragment
    }
  }

  ${RoleBasicFragmentFragmentDoc}
`;
export class CreateRoleComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateRoleMutation, CreateRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateRoleMutation, CreateRoleVariables>
        mutation={CreateRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateRoleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateRoleMutation, CreateRoleVariables>
> &
  TChildProps;
export type CreateRoleMutationFn = ReactApollo.MutationFn<
  CreateRoleMutation,
  CreateRoleVariables
>;
export function CreateRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateRoleMutation,
        CreateRoleVariables,
        CreateRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateRoleMutation,
    CreateRoleVariables,
    CreateRoleProps<TChildProps>
  >(CreateRoleDocument, operationOptions);
}
export const DeleteByRoleIdDocument = gql`
  mutation DeleteByRoleID($data: String!) {
    deleteByRoleID(id: $data)
  }
`;
export class DeleteByRoleIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteByRoleIdMutation, DeleteByRoleIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteByRoleIdMutation, DeleteByRoleIdVariables>
        mutation={DeleteByRoleIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteByRoleIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteByRoleIdMutation, DeleteByRoleIdVariables>
> &
  TChildProps;
export type DeleteByRoleIdMutationFn = ReactApollo.MutationFn<
  DeleteByRoleIdMutation,
  DeleteByRoleIdVariables
>;
export function DeleteByRoleIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteByRoleIdMutation,
        DeleteByRoleIdVariables,
        DeleteByRoleIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteByRoleIdMutation,
    DeleteByRoleIdVariables,
    DeleteByRoleIdProps<TChildProps>
  >(DeleteByRoleIdDocument, operationOptions);
}
export const UpdateByRoleIdDocument = gql`
  mutation UpdateByRoleID($id: String!, $data: UpdateRoleInput!) {
    updateByRoleID(id: $id, data: $data) {
      ...RoleBasicFragment
    }
  }

  ${RoleBasicFragmentFragmentDoc}
`;
export class UpdateByRoleIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateByRoleIdMutation, UpdateByRoleIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateByRoleIdMutation, UpdateByRoleIdVariables>
        mutation={UpdateByRoleIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateByRoleIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateByRoleIdMutation, UpdateByRoleIdVariables>
> &
  TChildProps;
export type UpdateByRoleIdMutationFn = ReactApollo.MutationFn<
  UpdateByRoleIdMutation,
  UpdateByRoleIdVariables
>;
export function UpdateByRoleIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateByRoleIdMutation,
        UpdateByRoleIdVariables,
        UpdateByRoleIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateByRoleIdMutation,
    UpdateByRoleIdVariables,
    UpdateByRoleIdProps<TChildProps>
  >(UpdateByRoleIdDocument, operationOptions);
}
export const GetAllRoleDocument = gql`
  query GetAllRole {
    getAllRole {
      ...RoleBasicFragment
    }
  }

  ${RoleBasicFragmentFragmentDoc}
`;
export class GetAllRoleComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAllRoleQuery, GetAllRoleVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAllRoleQuery, GetAllRoleVariables>
        query={GetAllRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllRoleProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllRoleQuery, GetAllRoleVariables>
> &
  TChildProps;
export function GetAllRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllRoleQuery,
        GetAllRoleVariables,
        GetAllRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllRoleQuery,
    GetAllRoleVariables,
    GetAllRoleProps<TChildProps>
  >(GetAllRoleDocument, operationOptions);
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
export const CreateScheduleDocument = gql`
  mutation CreateSchedule($data: CreateScheduleInput!) {
    createSchedule(data: $data) {
      ...ScheduleBasicFragment
    }
  }

  ${ScheduleBasicFragmentFragmentDoc}
`;
export class CreateScheduleComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateScheduleMutation, CreateScheduleVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateScheduleMutation, CreateScheduleVariables>
        mutation={CreateScheduleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateScheduleProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateScheduleMutation, CreateScheduleVariables>
> &
  TChildProps;
export type CreateScheduleMutationFn = ReactApollo.MutationFn<
  CreateScheduleMutation,
  CreateScheduleVariables
>;
export function CreateScheduleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateScheduleMutation,
        CreateScheduleVariables,
        CreateScheduleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateScheduleMutation,
    CreateScheduleVariables,
    CreateScheduleProps<TChildProps>
  >(CreateScheduleDocument, operationOptions);
}
export const DeleteByScheduleIdDocument = gql`
  mutation DeleteByScheduleID($data: String!) {
    deleteByScheduleID(id: $data)
  }
`;
export class DeleteByScheduleIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      DeleteByScheduleIdMutation,
      DeleteByScheduleIdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        DeleteByScheduleIdMutation,
        DeleteByScheduleIdVariables
      >
        mutation={DeleteByScheduleIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteByScheduleIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    DeleteByScheduleIdMutation,
    DeleteByScheduleIdVariables
  >
> &
  TChildProps;
export type DeleteByScheduleIdMutationFn = ReactApollo.MutationFn<
  DeleteByScheduleIdMutation,
  DeleteByScheduleIdVariables
>;
export function DeleteByScheduleIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteByScheduleIdMutation,
        DeleteByScheduleIdVariables,
        DeleteByScheduleIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteByScheduleIdMutation,
    DeleteByScheduleIdVariables,
    DeleteByScheduleIdProps<TChildProps>
  >(DeleteByScheduleIdDocument, operationOptions);
}
export const UpdateByScheduleIdDocument = gql`
  mutation UpdateByScheduleID($id: String!, $data: UpdateScheduleInput!) {
    updateByScheduleID(id: $id, data: $data) {
      ...ScheduleBasicFragment
    }
  }

  ${ScheduleBasicFragmentFragmentDoc}
`;
export class UpdateByScheduleIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      UpdateByScheduleIdMutation,
      UpdateByScheduleIdVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        UpdateByScheduleIdMutation,
        UpdateByScheduleIdVariables
      >
        mutation={UpdateByScheduleIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateByScheduleIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    UpdateByScheduleIdMutation,
    UpdateByScheduleIdVariables
  >
> &
  TChildProps;
export type UpdateByScheduleIdMutationFn = ReactApollo.MutationFn<
  UpdateByScheduleIdMutation,
  UpdateByScheduleIdVariables
>;
export function UpdateByScheduleIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateByScheduleIdMutation,
        UpdateByScheduleIdVariables,
        UpdateByScheduleIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateByScheduleIdMutation,
    UpdateByScheduleIdVariables,
    UpdateByScheduleIdProps<TChildProps>
  >(UpdateByScheduleIdDocument, operationOptions);
}
export const GetAllScheduleDocument = gql`
  query GetAllSchedule {
    getAllSchedule {
      ...ScheduleBasicFragment
    }
  }

  ${ScheduleBasicFragmentFragmentDoc}
`;
export class GetAllScheduleComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAllScheduleQuery, GetAllScheduleVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAllScheduleQuery, GetAllScheduleVariables>
        query={GetAllScheduleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllScheduleProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllScheduleQuery, GetAllScheduleVariables>
> &
  TChildProps;
export function GetAllScheduleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllScheduleQuery,
        GetAllScheduleVariables,
        GetAllScheduleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllScheduleQuery,
    GetAllScheduleVariables,
    GetAllScheduleProps<TChildProps>
  >(GetAllScheduleDocument, operationOptions);
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
export const CreateUserDocument = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      ...UserBasicFragment
    }
  }

  ${UserBasicFragmentFragmentDoc}
`;
export class CreateUserComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateUserMutation, CreateUserVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateUserMutation, CreateUserVariables>
        mutation={CreateUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateUserMutation, CreateUserVariables>
> &
  TChildProps;
export type CreateUserMutationFn = ReactApollo.MutationFn<
  CreateUserMutation,
  CreateUserVariables
>;
export function CreateUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateUserMutation,
        CreateUserVariables,
        CreateUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateUserMutation,
    CreateUserVariables,
    CreateUserProps<TChildProps>
  >(CreateUserDocument, operationOptions);
}
export const DeleteByUserIdDocument = gql`
  mutation DeleteByUserID($data: String!) {
    deleteByUserID(id: $data)
  }
`;
export class DeleteByUserIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<DeleteByUserIdMutation, DeleteByUserIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<DeleteByUserIdMutation, DeleteByUserIdVariables>
        mutation={DeleteByUserIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type DeleteByUserIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<DeleteByUserIdMutation, DeleteByUserIdVariables>
> &
  TChildProps;
export type DeleteByUserIdMutationFn = ReactApollo.MutationFn<
  DeleteByUserIdMutation,
  DeleteByUserIdVariables
>;
export function DeleteByUserIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        DeleteByUserIdMutation,
        DeleteByUserIdVariables,
        DeleteByUserIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    DeleteByUserIdMutation,
    DeleteByUserIdVariables,
    DeleteByUserIdProps<TChildProps>
  >(DeleteByUserIdDocument, operationOptions);
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
export const UpdateByUserIdDocument = gql`
  mutation UpdateByUserID($id: String!, $data: UpdateUserInput!) {
    updateByUserID(id: $id, data: $data) {
      ...UserBasicFragment
    }
  }

  ${UserBasicFragmentFragmentDoc}
`;
export class UpdateByUserIdComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateByUserIdMutation, UpdateByUserIdVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateByUserIdMutation, UpdateByUserIdVariables>
        mutation={UpdateByUserIdDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UpdateByUserIdProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<UpdateByUserIdMutation, UpdateByUserIdVariables>
> &
  TChildProps;
export type UpdateByUserIdMutationFn = ReactApollo.MutationFn<
  UpdateByUserIdMutation,
  UpdateByUserIdVariables
>;
export function UpdateByUserIdHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateByUserIdMutation,
        UpdateByUserIdVariables,
        UpdateByUserIdProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    UpdateByUserIdMutation,
    UpdateByUserIdVariables,
    UpdateByUserIdProps<TChildProps>
  >(UpdateByUserIdDocument, operationOptions);
}
export const GetAllUserDocument = gql`
  query GetAllUser {
    getAllUser {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }

  ${UserBasicFragmentFragmentDoc}
  ${RoleBasicFragmentFragmentDoc}
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
export const GetAllUserByRoleDocument = gql`
  query GetAllUserByRole($data: GetUserByRoleInput) {
    getAllUserByRole(data: $data) {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }

  ${UserBasicFragmentFragmentDoc}
  ${RoleBasicFragmentFragmentDoc}
`;
export class GetAllUserByRoleComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllUserByRoleQuery, GetAllUserByRoleVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllUserByRoleQuery, GetAllUserByRoleVariables>
        query={GetAllUserByRoleDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllUserByRoleProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllUserByRoleQuery, GetAllUserByRoleVariables>
> &
  TChildProps;
export function GetAllUserByRoleHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllUserByRoleQuery,
        GetAllUserByRoleVariables,
        GetAllUserByRoleProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllUserByRoleQuery,
    GetAllUserByRoleVariables,
    GetAllUserByRoleProps<TChildProps>
  >(GetAllUserByRoleDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserBasicFragment
    }
  }

  ${UserBasicFragmentFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
