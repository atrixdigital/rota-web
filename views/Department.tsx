import React, { Component } from "react";
import * as yup from "yup";
import {
  DepartmentBasicFragmentFragment,
  GetAllDepartmentHOC,
  DeleteByDepartmentIdHOC,
  UpdateByDepartmentIdHOC,
  CreateDepartmentHOC,
  GetAllDepartmentProps,
  DeleteByDepartmentIdProps,
  UpdateByDepartmentIdProps,
  CreateDepartmentProps,
  GetAllUserByRoleHOC,
  GetAllUserByRoleProps
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { validateDepartmentSchema } from "../shared/validation-schema";
import { FieldsOptions, Crud_Fields, Crud_Mutation } from "../interfaces";
import { generateRelationFieldsData } from "../shared/helpersFunctions";

interface InitialValue {
  title: string;
  email: string;
  phone: string;
  userID: string;
}

interface Props {
  getAllUserByRole: GetAllUserByRoleProps;
  getAll: GetAllDepartmentProps;
  deleteBy: DeleteByDepartmentIdProps;
  updateBy: UpdateByDepartmentIdProps;
  create: CreateDepartmentProps;
  callBack: (
    data: DepartmentBasicFragmentFragment[],
    fields: Crud_Fields[],
    deleteBy: Crud_Mutation,
    updateBy: Crud_Mutation,
    create: Crud_Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: yup.ObjectSchema<yup.Shape<{}, InitialValue>>,
    formFields: FieldsOptions[]
  ) => void;
}

class Department extends Component<Props> {
  render() {
    const {
      getAllUserByRole: { getAllUserByRole },
      getAll: { getAllDepartment, loading },
      deleteBy,
      updateBy,
      create,
      callBack
    } = this.props;
    if (loading) {
      return <div />;
    }
    const initialValue: InitialValue = {
      title: "",
      email: "",
      phone: "",
      userID: ""
    };
    const formFields: FieldsOptions[] = [
      {
        f_name: "title",
        f_type: "text",
        f_label: "Title"
      },
      {
        f_name: "email",
        f_type: "email",
        f_label: "Email"
      },
      {
        f_name: "phone",
        f_type: "text",
        f_label: "Phone"
      }
    ];
    formFields.push(
      generateRelationFieldsData(
        {
          f_name: "userID",
          f_type: "select",
          f_label: "User",
          f_options: [
            {
              o_id: "",
              o_title: "Select User"
            }
          ]
        },
        getAllUserByRole,
        "name"
      )
    );
    callBack(
      getAllDepartment,
      [
        { title: "title", type: "title", name: "title" },
        {
          title: "email",
          type: "text",
          name: "email"
        },
        {
          title: "phone",
          type: "text",
          name: "phone"
        },
        {
          title: "",
          type: "action",
          name: ""
        }
      ],
      {
        mutation: deleteBy,
        field: "deleteByDepartmentID"
      },
      {
        mutation: updateBy,
        field: "updateByDepartmentID"
      },
      {
        mutation: create,
        field: "createDepartment"
      },
      initialValue,
      validateDepartmentSchema,
      formFields
    );
    return <div />;
  }
}

export default compose(
  GetAllUserByRoleHOC({ name: "getAllUserByRole" }),
  GetAllDepartmentHOC({ name: "getAll" }),
  DeleteByDepartmentIdHOC({ name: "deleteBy" }),
  UpdateByDepartmentIdHOC({ name: "updateBy" }),
  CreateDepartmentHOC({ name: "create" })
)(Department);
