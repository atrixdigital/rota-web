import React, { Component } from "react";
import {
  GetAllUserHOC,
  GetAllUserProps,
  DeleteByUserIdHOC,
  UpdateByUserIdHOC,
  CreateUserHOC,
  GetAllRoleNoAuthHOC,
  GetAllRoleNoAuthProps,
  DeleteByUserIdProps,
  UpdateByUserIdProps,
  CreateUserProps,
  UserBasicFragmentFragment
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { validateRegisterSchema } from "../shared/validation-schema";
import { FieldsOptions } from "../interfaces";
import { generateRelationFieldsData } from "../shared/helpersFunctions";

interface Fields {
  title: string;
  type: string;
}

interface Mutation {
  mutation: any;
  field: string;
}

interface InitialValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appproved: string;
  roleID: string;
}

interface Props {
  getAllRoleNoAuth: GetAllRoleNoAuthProps;
  getAll: GetAllUserProps;
  deleteBy: DeleteByUserIdProps;
  updateBy: UpdateByUserIdProps;
  create: CreateUserProps;
  callBack: (
    data: UserBasicFragmentFragment[],
    fields: Fields[],
    deleteBy: Mutation,
    updateBy: Mutation,
    create: Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: any,
    formFields: FieldsOptions[]
  ) => void;
}

class User extends Component<Props> {
  render() {
    const {
      getAllRoleNoAuth: { getAllRoleNoAuth },
      getAll: { getAllUser, loading },
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
      appproved: "",
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
      getAllUser,
      [
        { title: "name", type: "title" },
        {
          title: "email",
          type: "text"
        },
        {
          title: "",
          type: "action"
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
  GetAllUserHOC({ name: "getAll" }),
  DeleteByUserIdHOC({ name: "deleteBy" }),
  UpdateByUserIdHOC({ name: "updateBy" }),
  CreateUserHOC({ name: "create" })
)(User);
