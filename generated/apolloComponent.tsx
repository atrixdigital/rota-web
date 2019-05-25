export type Maybe<T> = T | null;

export interface GetUserByRoleInput {
  roleType?: Maybe<string>;
}

export interface GetUserByFilterInput {
  roleType?: Maybe<string>;

  approved?: Maybe<boolean>;
}

export interface CreateUserInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone: string;

  appproved?: Maybe<boolean>;

  roleID: string;

  areaID?: Maybe<string>;
}

export interface UpdateUserInput {
  firstName: string;

  lastName: string;

  email: string;

  password: string;

  phone: string;

  appproved?: Maybe<boolean>;

  roleID: string;

  areaID?: Maybe<string>;
}

export interface CreateScheduleInput {
  startTime: string;

  endTime: string;

  totalHours: number;

  joinTime?: Maybe<string>;

  staffID: string;
}

export interface UpdateScheduleInput {
  startTime: string;

  endTime: string;

  totalHours: number;

  joinTime?: Maybe<string>;

  staffID: string;
}

export interface CreateRoleInput {
  title: string;
}

export interface UpdateRoleInput {
  title: string;
}

export interface CreateHospitalInput {
  title: string;

  adminID: string;
}

export interface UpdateHospitalInput {
  title: string;

  adminID: string;
}

export interface CreateDepartmentInput {
  title: string;

  email: string;

  phone: string;

  managerID: string;
}

export interface UpdateDepartmentInput {
  title: string;

  email: string;

  phone: string;

  managerID: string;
}

export interface CreateAreaInput {
  title: string;
}

export interface UpdateAreaInput {
  title: string;
}

export interface AssignAreaDepartmentsInput {
  areaID: string;

  departmentIDs: string[];
}

export interface AssignDepartmentRolesInput {
  departmentID: string;

  roleIDs: string[];
}

export interface AssignDepartmentAreasInput {
  departmentID: string;

  areaIDs: string[];
}

export interface AssignRoleDepartmentsInput {
  roleID: string;

  departmentIDs: string[];
}

export interface ChangePasswordInput {
  token: string;

  password: string;
}

// ====================================================
// Documents
// ====================================================

export type AssignAreaDepartmentsVariables = {
  data: AssignAreaDepartmentsInput;
};

export type AssignAreaDepartmentsMutation = {
  __typename?: "Mutation";

  assignAreaDepartments: AssignAreaDepartmentsAssignAreaDepartments;
};

export type AssignAreaDepartmentsAssignAreaDepartments = AreaBasicFragmentFragment;

export type CreateAreaVariables = {
  data: CreateAreaInput;
};

export type CreateAreaMutation = {
  __typename?: "Mutation";

  createArea: CreateAreaCreateArea;
};

export type CreateAreaCreateArea = AreaBasicFragmentFragment;

export type GetAllAreaVariables = {};

export type GetAllAreaQuery = {
  __typename?: "Query";

  getAllArea: GetAllAreaGetAllArea[];
};

export type GetAllAreaGetAllArea = AreaBasicFragmentFragment;

export type AssignDepartmentAreasVariables = {
  data: AssignDepartmentAreasInput;
};

export type AssignDepartmentAreasMutation = {
  __typename?: "Mutation";

  assignDepartmentAreas: AssignDepartmentAreasAssignDepartmentAreas;
};

export type AssignDepartmentAreasAssignDepartmentAreas = DepartmentBasicFragmentFragment;

export type AssignDepartmentRolesVariables = {
  data: AssignDepartmentRolesInput;
};

export type AssignDepartmentRolesMutation = {
  __typename?: "Mutation";

  assignDepartmentRoles: AssignDepartmentRolesAssignDepartmentRoles;
};

export type AssignDepartmentRolesAssignDepartmentRoles = DepartmentBasicFragmentFragment;

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

export type RemoveDepartmentAreasVariables = {
  data: AssignDepartmentAreasInput;
};

export type RemoveDepartmentAreasMutation = {
  __typename?: "Mutation";

  removeDepartmentAreas: boolean;
};

export type RemoveDepartmentRolesVariables = {
  data: AssignDepartmentRolesInput;
};

export type RemoveDepartmentRolesMutation = {
  __typename?: "Mutation";

  removeDepartmentRoles: boolean;
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

export type GetDepartmentVariables = {
  id: string;
};

export type GetDepartmentQuery = {
  __typename?: "Query";

  getDepartment: GetDepartmentGetDepartment;
};

export type GetDepartmentGetDepartment = DepartmentBasicFragmentFragment;

export type AssignRoleDepartmentsVariables = {
  data: AssignRoleDepartmentsInput;
};

export type AssignRoleDepartmentsMutation = {
  __typename?: "Mutation";

  assignRoleDepartments: AssignRoleDepartmentsAssignRoleDepartments;
};

export type AssignRoleDepartmentsAssignRoleDepartments = RoleBasicFragmentFragment;

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

export type ApprovedUserVariables = {
  approved: boolean;
  userID: string;
};

export type ApprovedUserMutation = {
  __typename?: "Mutation";

  approvedUser: boolean;
};

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

  login: LoginLogin;
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

export type GetAllUserByFilterVariables = {
  data?: Maybe<GetUserByFilterInput>;
};

export type GetAllUserByFilterQuery = {
  __typename?: "Query";

  getAllUserByFilter: GetAllUserByFilterGetAllUserByFilter[];
};

export type GetAllUserByFilterGetAllUserByFilter = {
  __typename?: "User";

  role: Maybe<GetAllUserByFilterRole>;
} & UserBasicFragmentFragment;

export type GetAllUserByFilterRole = RoleBasicFragmentFragment;

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

export type MeMe = {
  __typename?: "User";

  role: Maybe<MeRole>;
} & UserBasicFragmentFragment;

export type MeRole = RoleBasicFragmentFragment;

export type AreaBasicFragmentFragment = {
  __typename?: "Area";

  id: string;

  title: string;
};

export type DepartmentBasicFragmentFragment = {
  __typename?: "Department";

  id: string;

  title: string;

  email: string;

  phone: string;

  manager: DepartmentBasicFragmentManager;

  staffs: DepartmentBasicFragmentStaffs[];

  roles: DepartmentBasicFragmentRoles[];

  areas: DepartmentBasicFragmentAreas[];
};

export type DepartmentBasicFragmentManager = {
  __typename?: "User";

  id: string;

  name: string;
};

export type DepartmentBasicFragmentStaffs = {
  __typename?: "User";

  id: string;

  name: string;
};

export type DepartmentBasicFragmentRoles = {
  __typename?: "Role";

  id: string;

  title: string;
};

export type DepartmentBasicFragmentAreas = {
  __typename?: "Area";

  id: string;

  title: string;
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

  joinTime: Maybe<string>;

  staff: Maybe<ScheduleBasicFragmentStaff>;
};

export type ScheduleBasicFragmentStaff = UserBasicFragmentFragment;

export type UserBasicFragmentFragment = {
  __typename?: "User";

  id: string;

  firstName: string;

  lastName: string;

  name: string;

  email: string;

  password: string;

  phone: string;

  appproved: Maybe<boolean>;

  area: Maybe<UserBasicFragmentArea>;

  department: Maybe<UserBasicFragmentDepartment>;
};

export type UserBasicFragmentArea = {
  __typename?: "Area";

  id: string;

  title: string;
};

export type UserBasicFragmentDepartment = DepartmentBasicFragmentFragment;

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const AreaBasicFragmentFragmentDoc = gql`
  fragment AreaBasicFragment on Area {
    id
    title
  }
`;

export const RoleBasicFragmentFragmentDoc = gql`
  fragment RoleBasicFragment on Role {
    id
    title
  }
`;

export const DepartmentBasicFragmentFragmentDoc = gql`
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

export const UserBasicFragmentFragmentDoc = gql`
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
    department {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;

export const ScheduleBasicFragmentFragmentDoc = gql`
  fragment ScheduleBasicFragment on Schedule {
    id
    startTime
    endTime
    totalHours
    joinTime
    staff {
      ...UserBasicFragment
    }
  }

  ${UserBasicFragmentFragmentDoc}
`;

// ====================================================
// Components
// ====================================================

export const AssignAreaDepartmentsDocument = gql`
  mutation AssignAreaDepartments($data: AssignAreaDepartmentsInput!) {
    assignAreaDepartments(data: $data) {
      ...AreaBasicFragment
    }
  }

  ${AreaBasicFragmentFragmentDoc}
`;
export class AssignAreaDepartmentsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AssignAreaDepartmentsMutation,
      AssignAreaDepartmentsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AssignAreaDepartmentsMutation,
        AssignAreaDepartmentsVariables
      >
        mutation={AssignAreaDepartmentsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AssignAreaDepartmentsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    AssignAreaDepartmentsMutation,
    AssignAreaDepartmentsVariables
  >
> &
  TChildProps;
export type AssignAreaDepartmentsMutationFn = ReactApollo.MutationFn<
  AssignAreaDepartmentsMutation,
  AssignAreaDepartmentsVariables
>;
export function AssignAreaDepartmentsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AssignAreaDepartmentsMutation,
        AssignAreaDepartmentsVariables,
        AssignAreaDepartmentsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AssignAreaDepartmentsMutation,
    AssignAreaDepartmentsVariables,
    AssignAreaDepartmentsProps<TChildProps>
  >(AssignAreaDepartmentsDocument, operationOptions);
}
export const CreateAreaDocument = gql`
  mutation CreateArea($data: CreateAreaInput!) {
    createArea(data: $data) {
      ...AreaBasicFragment
    }
  }

  ${AreaBasicFragmentFragmentDoc}
`;
export class CreateAreaComponent extends React.Component<
  Partial<ReactApollo.MutationProps<CreateAreaMutation, CreateAreaVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateAreaMutation, CreateAreaVariables>
        mutation={CreateAreaDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateAreaProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<CreateAreaMutation, CreateAreaVariables>
> &
  TChildProps;
export type CreateAreaMutationFn = ReactApollo.MutationFn<
  CreateAreaMutation,
  CreateAreaVariables
>;
export function CreateAreaHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateAreaMutation,
        CreateAreaVariables,
        CreateAreaProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CreateAreaMutation,
    CreateAreaVariables,
    CreateAreaProps<TChildProps>
  >(CreateAreaDocument, operationOptions);
}
export const GetAllAreaDocument = gql`
  query GetAllArea {
    getAllArea {
      ...AreaBasicFragment
    }
  }

  ${AreaBasicFragmentFragmentDoc}
`;
export class GetAllAreaComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetAllAreaQuery, GetAllAreaVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetAllAreaQuery, GetAllAreaVariables>
        query={GetAllAreaDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllAreaProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllAreaQuery, GetAllAreaVariables>
> &
  TChildProps;
export function GetAllAreaHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllAreaQuery,
        GetAllAreaVariables,
        GetAllAreaProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllAreaQuery,
    GetAllAreaVariables,
    GetAllAreaProps<TChildProps>
  >(GetAllAreaDocument, operationOptions);
}
export const AssignDepartmentAreasDocument = gql`
  mutation AssignDepartmentAreas($data: AssignDepartmentAreasInput!) {
    assignDepartmentAreas(data: $data) {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;
export class AssignDepartmentAreasComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AssignDepartmentAreasMutation,
      AssignDepartmentAreasVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AssignDepartmentAreasMutation,
        AssignDepartmentAreasVariables
      >
        mutation={AssignDepartmentAreasDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AssignDepartmentAreasProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    AssignDepartmentAreasMutation,
    AssignDepartmentAreasVariables
  >
> &
  TChildProps;
export type AssignDepartmentAreasMutationFn = ReactApollo.MutationFn<
  AssignDepartmentAreasMutation,
  AssignDepartmentAreasVariables
>;
export function AssignDepartmentAreasHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AssignDepartmentAreasMutation,
        AssignDepartmentAreasVariables,
        AssignDepartmentAreasProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AssignDepartmentAreasMutation,
    AssignDepartmentAreasVariables,
    AssignDepartmentAreasProps<TChildProps>
  >(AssignDepartmentAreasDocument, operationOptions);
}
export const AssignDepartmentRolesDocument = gql`
  mutation AssignDepartmentRoles($data: AssignDepartmentRolesInput!) {
    assignDepartmentRoles(data: $data) {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;
export class AssignDepartmentRolesComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AssignDepartmentRolesMutation,
      AssignDepartmentRolesVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AssignDepartmentRolesMutation,
        AssignDepartmentRolesVariables
      >
        mutation={AssignDepartmentRolesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AssignDepartmentRolesProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    AssignDepartmentRolesMutation,
    AssignDepartmentRolesVariables
  >
> &
  TChildProps;
export type AssignDepartmentRolesMutationFn = ReactApollo.MutationFn<
  AssignDepartmentRolesMutation,
  AssignDepartmentRolesVariables
>;
export function AssignDepartmentRolesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AssignDepartmentRolesMutation,
        AssignDepartmentRolesVariables,
        AssignDepartmentRolesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AssignDepartmentRolesMutation,
    AssignDepartmentRolesVariables,
    AssignDepartmentRolesProps<TChildProps>
  >(AssignDepartmentRolesDocument, operationOptions);
}
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
export const RemoveDepartmentAreasDocument = gql`
  mutation removeDepartmentAreas($data: AssignDepartmentAreasInput!) {
    removeDepartmentAreas(data: $data)
  }
`;
export class RemoveDepartmentAreasComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RemoveDepartmentAreasMutation,
      RemoveDepartmentAreasVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RemoveDepartmentAreasMutation,
        RemoveDepartmentAreasVariables
      >
        mutation={RemoveDepartmentAreasDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveDepartmentAreasProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    RemoveDepartmentAreasMutation,
    RemoveDepartmentAreasVariables
  >
> &
  TChildProps;
export type RemoveDepartmentAreasMutationFn = ReactApollo.MutationFn<
  RemoveDepartmentAreasMutation,
  RemoveDepartmentAreasVariables
>;
export function RemoveDepartmentAreasHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveDepartmentAreasMutation,
        RemoveDepartmentAreasVariables,
        RemoveDepartmentAreasProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveDepartmentAreasMutation,
    RemoveDepartmentAreasVariables,
    RemoveDepartmentAreasProps<TChildProps>
  >(RemoveDepartmentAreasDocument, operationOptions);
}
export const RemoveDepartmentRolesDocument = gql`
  mutation RemoveDepartmentRoles($data: AssignDepartmentRolesInput!) {
    removeDepartmentRoles(data: $data)
  }
`;
export class RemoveDepartmentRolesComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RemoveDepartmentRolesMutation,
      RemoveDepartmentRolesVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RemoveDepartmentRolesMutation,
        RemoveDepartmentRolesVariables
      >
        mutation={RemoveDepartmentRolesDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RemoveDepartmentRolesProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    RemoveDepartmentRolesMutation,
    RemoveDepartmentRolesVariables
  >
> &
  TChildProps;
export type RemoveDepartmentRolesMutationFn = ReactApollo.MutationFn<
  RemoveDepartmentRolesMutation,
  RemoveDepartmentRolesVariables
>;
export function RemoveDepartmentRolesHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RemoveDepartmentRolesMutation,
        RemoveDepartmentRolesVariables,
        RemoveDepartmentRolesProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RemoveDepartmentRolesMutation,
    RemoveDepartmentRolesVariables,
    RemoveDepartmentRolesProps<TChildProps>
  >(RemoveDepartmentRolesDocument, operationOptions);
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
export const GetDepartmentDocument = gql`
  query GetDepartment($id: String!) {
    getDepartment(id: $id) {
      ...DepartmentBasicFragment
    }
  }

  ${DepartmentBasicFragmentFragmentDoc}
`;
export class GetDepartmentComponent extends React.Component<
  Partial<ReactApollo.QueryProps<GetDepartmentQuery, GetDepartmentVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<GetDepartmentQuery, GetDepartmentVariables>
        query={GetDepartmentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetDepartmentProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetDepartmentQuery, GetDepartmentVariables>
> &
  TChildProps;
export function GetDepartmentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetDepartmentQuery,
        GetDepartmentVariables,
        GetDepartmentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetDepartmentQuery,
    GetDepartmentVariables,
    GetDepartmentProps<TChildProps>
  >(GetDepartmentDocument, operationOptions);
}
export const AssignRoleDepartmentsDocument = gql`
  mutation AssignRoleDepartments($data: AssignRoleDepartmentsInput!) {
    assignRoleDepartments(data: $data) {
      ...RoleBasicFragment
    }
  }

  ${RoleBasicFragmentFragmentDoc}
`;
export class AssignRoleDepartmentsComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      AssignRoleDepartmentsMutation,
      AssignRoleDepartmentsVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        AssignRoleDepartmentsMutation,
        AssignRoleDepartmentsVariables
      >
        mutation={AssignRoleDepartmentsDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AssignRoleDepartmentsProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    AssignRoleDepartmentsMutation,
    AssignRoleDepartmentsVariables
  >
> &
  TChildProps;
export type AssignRoleDepartmentsMutationFn = ReactApollo.MutationFn<
  AssignRoleDepartmentsMutation,
  AssignRoleDepartmentsVariables
>;
export function AssignRoleDepartmentsHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AssignRoleDepartmentsMutation,
        AssignRoleDepartmentsVariables,
        AssignRoleDepartmentsProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    AssignRoleDepartmentsMutation,
    AssignRoleDepartmentsVariables,
    AssignRoleDepartmentsProps<TChildProps>
  >(AssignRoleDepartmentsDocument, operationOptions);
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
export const ApprovedUserDocument = gql`
  mutation ApprovedUser($approved: Boolean!, $userID: String!) {
    approvedUser(approved: $approved, userID: $userID)
  }
`;
export class ApprovedUserComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<ApprovedUserMutation, ApprovedUserVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<ApprovedUserMutation, ApprovedUserVariables>
        mutation={ApprovedUserDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ApprovedUserProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<ApprovedUserMutation, ApprovedUserVariables>
> &
  TChildProps;
export type ApprovedUserMutationFn = ReactApollo.MutationFn<
  ApprovedUserMutation,
  ApprovedUserVariables
>;
export function ApprovedUserHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ApprovedUserMutation,
        ApprovedUserVariables,
        ApprovedUserProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ApprovedUserMutation,
    ApprovedUserVariables,
    ApprovedUserProps<TChildProps>
  >(ApprovedUserDocument, operationOptions);
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
export const GetAllUserByFilterDocument = gql`
  query GetAllUserByFilter($data: GetUserByFilterInput) {
    getAllUserByFilter(data: $data) {
      ...UserBasicFragment
      role {
        ...RoleBasicFragment
      }
    }
  }

  ${UserBasicFragmentFragmentDoc}
  ${RoleBasicFragmentFragmentDoc}
`;
export class GetAllUserByFilterComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<GetAllUserByFilterQuery, GetAllUserByFilterVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<GetAllUserByFilterQuery, GetAllUserByFilterVariables>
        query={GetAllUserByFilterDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type GetAllUserByFilterProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<GetAllUserByFilterQuery, GetAllUserByFilterVariables>
> &
  TChildProps;
export function GetAllUserByFilterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        GetAllUserByFilterQuery,
        GetAllUserByFilterVariables,
        GetAllUserByFilterProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    GetAllUserByFilterQuery,
    GetAllUserByFilterVariables,
    GetAllUserByFilterProps<TChildProps>
  >(GetAllUserByFilterDocument, operationOptions);
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
      role {
        ...RoleBasicFragment
      }
    }
  }

  ${UserBasicFragmentFragmentDoc}
  ${RoleBasicFragmentFragmentDoc}
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
