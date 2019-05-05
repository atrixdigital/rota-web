import React, { Component } from "react";
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
import { FieldsOptions } from "../interfaces";
import { validateRoleSchema } from "../shared/validation-schema";

interface Fields {
  title: string;
  type: string;
}

interface Mutation {
  mutation: any;
  field: string;
}

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
    fields: Fields[],
    deleteBy: Mutation,
    updateBy: Mutation,
    create: Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: any,
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
          type: "title"
        },
        {
          title: "",
          type: "action"
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
