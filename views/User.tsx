import React, { Component } from "react";
import * as yup from "yup";
import {
  DeleteByUserIdHOC,
  UpdateByUserIdHOC,
  CreateUserHOC,
  GetAllRoleNoAuthHOC,
  GetAllRoleNoAuthProps,
  DeleteByUserIdProps,
  UpdateByUserIdProps,
  CreateUserProps,
  UserBasicFragmentFragment,
  GetAllUserByRoleHOC,
  GetAllUserByRoleProps
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { validateRegisterSchema } from "../shared/validation-schema";
import { FieldsOptions, Crud_Fields, Crud_Mutation } from "../interfaces";
import { generateRelationFieldsData } from "../shared/helpersFunctions";

interface InitialValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appproved?: string;
  roleID: string;
}

interface Props {
  getAllRoleNoAuth: GetAllRoleNoAuthProps;
  getAll: GetAllUserByRoleProps;
  deleteBy: DeleteByUserIdProps;
  updateBy: UpdateByUserIdProps;
  create: CreateUserProps;
  callBack: (
    data: UserBasicFragmentFragment[],
    fields: Crud_Fields[],
    deleteBy: Crud_Mutation,
    updateBy: Crud_Mutation,
    create: Crud_Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: yup.ObjectSchema<yup.Shape<{}, InitialValue>>,
    formFields: FieldsOptions[]
  ) => void;
}

class User extends Component<Props> {
  render() {
    const {
      getAllRoleNoAuth: { getAllRoleNoAuth },
      getAll: { getAllUserByRole, loading },
      deleteBy,
      updateBy,
      create,
      callBack
    } = this.props;
    if (loading) {
      return <div />;
    }
    const initialValue: InitialValue = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleID: ""
    };
    const formFields: FieldsOptions[] = [
      {
        f_name: "firstName",
        f_type: "text",
        f_label: "First Name"
      },
      {
        f_name: "lastName",
        f_type: "text",
        f_label: "Last Name"
      },
      {
        f_name: "email",
        f_type: "email",
        f_label: "Email"
      },
      {
        f_name: "password",
        f_type: "password",
        f_label: "Password"
      }
    ];
    formFields.push(
      generateRelationFieldsData(
        {
          f_name: "roleID",
          f_type: "select",
          f_label: "Role",
          f_options: [
            {
              o_id: "",
              o_title: "Select Role"
            }
          ]
        },
        getAllRoleNoAuth
      )
    );
    callBack(
      getAllUserByRole,
      [
        { title: "name", type: "title", name: "name" },
        {
          title: "email",
          type: "text",
          name: "email"
        },
        {
          title: "",
          type: "action",
          name: ""
        }
      ],
      {
        mutation: deleteBy,
        field: "deleteByUserID"
      },
      {
        mutation: updateBy,
        field: "updateByUserID"
      },
      {
        mutation: create,
        field: "createUser"
      },
      initialValue,
      validateRegisterSchema,
      formFields
    );
    return <div />;
  }
}

export default compose(
  GetAllRoleNoAuthHOC({ name: "getAllRoleNoAuth" }),
  GetAllUserByRoleHOC({ name: "getAll" }),
  DeleteByUserIdHOC({ name: "deleteBy" }),
  UpdateByUserIdHOC({ name: "updateBy" }),
  CreateUserHOC({ name: "create" })
)(User);
