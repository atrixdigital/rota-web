import React, { Component } from "react";
import * as yup from "yup";
import {
  GetAllRoleHOC,
  DeleteByRoleIdHOC,
  UpdateByRoleIdHOC,
  CreateRoleHOC,
  GetAllRoleProps,
  DeleteByRoleIdProps,
  UpdateByRoleIdProps,
  CreateRoleProps,
  RoleBasicFragmentFragment
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { FieldsOptions, Crud_Fields, Crud_Mutation } from "../interfaces";
import { validateRoleSchema } from "../shared/validation-schema";

interface InitialValue {
  title: string;
}

interface Props {
  getAll: GetAllRoleProps;
  deleteBy: DeleteByRoleIdProps;
  updateBy: UpdateByRoleIdProps;
  create: CreateRoleProps;
  callBack: (
    data: RoleBasicFragmentFragment[],
    fields: Crud_Fields[],
    deleteBy: Crud_Mutation,
    updateBy: Crud_Mutation,
    create: Crud_Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: yup.ObjectSchema<yup.Shape<{}, InitialValue>>,
    formFields: FieldsOptions[]
  ) => void;
}

class Role extends Component<Props> {
  render() {
    const {
      getAll: { getAllRole, loading },
      deleteBy,
      updateBy,
      create,
      callBack
    } = this.props;
    if (loading) {
      return <div />;
    }
    const initialValue: InitialValue = {
      title: ""
    };
    const formFields: FieldsOptions[] = [
      {
        f_name: "title",
        f_type: "text",
        f_label: "Title"
      }
    ];
    callBack(
      getAllRole,
      [
        {
          title: "title",
          type: "title",
          name: "title"
        },
        {
          title: "",
          type: "action",
          name: ""
        }
      ],
      {
        mutation: deleteBy,
        field: "deleteByRoleID"
      },
      {
        mutation: updateBy,
        field: "updateByRoleID"
      },
      {
        mutation: create,
        field: "createRole"
      },
      initialValue,
      validateRoleSchema,
      formFields
    );
    return <div />;
  }
}

export default compose(
  GetAllRoleHOC({ name: "getAll" }),
  DeleteByRoleIdHOC({ name: "deleteBy" }),
  UpdateByRoleIdHOC({ name: "updateBy" }),
  CreateRoleHOC({ name: "create" })
)(Role);
