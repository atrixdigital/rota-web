import React, { Component } from "react";
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
  GetAllUserHOC,
  GetAllUserProps
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { validateDepartmentSchema } from "../shared/validation-schema";
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
  title: string;
  email: string;
  phone: string;
  userID: string;
}

interface Props {
  getAllUser: GetAllUserProps;
  getAll: GetAllDepartmentProps;
  deleteBy: DeleteByDepartmentIdProps;
  updateBy: UpdateByDepartmentIdProps;
  create: CreateDepartmentProps;
  callBack: (
    data: DepartmentBasicFragmentFragment[],
    fields: Fields[],
    deleteBy: Mutation,
    updateBy: Mutation,
    create: Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: any,
    formFields: FieldsOptions[]
  ) => void;
}

class Department extends Component<Props> {
  render() {
    const {
      getAllUser: { getAllUser },
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
        getAllUser,
        "name"
      )
    );
    callBack(
      getAllDepartment,
      [
        { title: "title", type: "title" },
        {
          title: "email",
          type: "text"
        },
        {
          title: "phone",
          type: "text"
        },
        {
          title: "",
          type: "action"
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
  GetAllUserHOC({ name: "getAllUser" }),
  GetAllDepartmentHOC({ name: "getAll" }),
  DeleteByDepartmentIdHOC({ name: "deleteBy" }),
  UpdateByDepartmentIdHOC({ name: "updateBy" }),
  CreateDepartmentHOC({ name: "create" })
)(Department);
