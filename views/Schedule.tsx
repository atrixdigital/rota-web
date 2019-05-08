import React, { Component } from "react";
import * as yup from "yup";
import {
  GetAllScheduleHOC,
  DeleteByScheduleIdHOC,
  UpdateByScheduleIdHOC,
  CreateScheduleHOC,
  GetAllScheduleProps,
  DeleteByScheduleIdProps,
  UpdateByScheduleIdProps,
  CreateScheduleProps,
  ScheduleBasicFragmentFragment,
  GetAllUserByRoleHOC,
  GetAllUserByRoleProps
} from "../generated/apolloComponent";
import { compose } from "react-apollo";
import { FieldsOptions, Crud_Fields, Crud_Mutation } from "../interfaces";
import { validateScheduleSchema } from "../shared/validation-schema";
import { generateRelationFieldsData } from "../shared/helpersFunctions";

interface InitialValue {
  startTime: Date;
  endTime: Date;
  totalHours: number;
  userID: string;
}

interface Props {
  getAllUserByRole: GetAllUserByRoleProps;
  getAll: GetAllScheduleProps;
  deleteBy: DeleteByScheduleIdProps;
  updateBy: UpdateByScheduleIdProps;
  create: CreateScheduleProps;
  callBack: (
    data: ScheduleBasicFragmentFragment[],
    fields: Crud_Fields[],
    deleteBy: Crud_Mutation,
    updateBy: Crud_Mutation,
    create: Crud_Mutation,
    initialValue: InitialValue,
    validateDepartmentSchema: yup.ObjectSchema<yup.Shape<{}, InitialValue>>,
    formFields: FieldsOptions[],
    onOpen?: () => void
  ) => void;
}

class Schedule extends Component<Props> {
  onOpen = () => {};

  render() {
    const {
      getAllUserByRole: { getAllUserByRole },
      getAll: { getAllSchedule, loading },
      deleteBy,
      updateBy,
      create,
      callBack
    } = this.props;
    if (loading) {
      return <div />;
    }
    const initialValue: InitialValue = {
      startTime: new Date(),
      endTime: new Date(),
      totalHours: 8,
      userID: ""
    };
    const formFields: FieldsOptions[] = [
      {
        f_name: "startTime",
        f_type: "datetimepicker",
        f_label: "Start Time"
      },
      {
        f_name: "endTime",
        f_type: "datetimepicker",
        f_label: "End Time"
      },
      {
        f_name: "totalHours",
        f_type: "number",
        f_label: "Total Hours"
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
      getAllSchedule,
      [
        {
          title: "Start Time",
          type: "title",
          name: "startTime",
          isDate: true
        },
        {
          title: "End Time",
          type: "text",
          name: "endTime",
          isDate: true
        },
        {
          title: "Total Hours",
          type: "text",
          name: "totalHours"
        },
        {
          title: "",
          type: "action",
          name: ""
        }
      ],
      {
        mutation: deleteBy,
        field: "deleteByScheduleID"
      },
      {
        mutation: updateBy,
        field: "updateByScheduleID"
      },
      {
        mutation: create,
        field: "createSchedule"
      },
      initialValue,
      validateScheduleSchema,
      formFields
    );
    return <div />;
  }
}

export default compose(
  GetAllUserByRoleHOC({
    name: "getAllUserByRole",
    options: {
      variables: {
        data: {
          roleType: "Staff"
        }
      }
    }
  }),
  GetAllScheduleHOC({ name: "getAll" }),
  DeleteByScheduleIdHOC({ name: "deleteBy" }),
  UpdateByScheduleIdHOC({ name: "updateBy" }),
  CreateScheduleHOC({ name: "create" })
)(Schedule);
