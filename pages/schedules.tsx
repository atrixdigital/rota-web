import { Component } from "react";
import { compose } from "react-apollo";
import Crud from "../components/Crud";
import { NumberField, SelectField, TextField } from "../components/FormFields";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  CreateScheduleHOC,
  CreateScheduleMutationFn,
  DeleteByScheduleIdHOC,
  DeleteByScheduleIdMutationFn,
  GetAllScheduleComponent,
  GetAllScheduleGetAllSchedule,
  GetAllUserByRoleHOC,
  GetAllUserByRoleQuery,
  UpdateByScheduleIdHOC,
  UpdateByScheduleIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { withAuth } from "../lib/withAuth";
import { validateScheduleSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByScheduleIdMutationFn,
    UpdateByScheduleIdMutationFn,
    CreateScheduleMutationFn
  > {
  getAllUserByRole: GetAllUserByRoleQuery;
}

interface State {
  modal: boolean;
  actionType: string;
  initialValue: InitialValue;
  selectedID: string;
}

interface InitialValue {
  startTime: Date;
  endTime: Date;
  totalHours: number;
  userID: string;
}

class Schedules extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    actionType: "create",
    initialValue: {
      startTime: new Date(),
      endTime: new Date(),
      totalHours: 0,
      userID: ""
    },
    selectedID: ""
  };

  _toggleModal = () =>
    this.setState(({ modal }) => ({
      modal: !modal
    }));

  _getOptionalObjectID = (obj: any) => (obj && obj.id ? obj.id : "");

  _changeActionType = async (type: string = "create") =>
    this.setState({ actionType: type }, () => Promise.resolve());

  _getActionType = (): string => this.state.actionType;

  render() {
    const {
      getAllUserByRole: { getAllUserByRole },
      create,
      updateBy,
      deleteBy,
      me
    } = this.props;
    const { initialValue, actionType, selectedID, modal } = this.state;
    return (
      <GetAllScheduleComponent fetchPolicy="cache-and-network">
        {({ data, loading, refetch }) => {
          return (
            <>
              <Crud<GetAllScheduleGetAllSchedule, InitialValue>
                me={me}
                filters={["filter"]}
                toggleModal={this._toggleModal}
                isModalOpen={modal}
                pageTitle="Schedules"
                items={data.getAllSchedule}
                fields={["start time", "end time", "total hours", "User", ""]}
                loading={loading}
                changeActionType={this._changeActionType}
                getActionType={this._getActionType}
                renderItem={({ id, startTime, endTime, totalHours, user }) => {
                  return (
                    <tr key={id}>
                      <RotaTableItemsTitle
                        title={new Date(parseInt(startTime)).toString()}
                      />
                      <RotaTableItemsTitle
                        title={new Date(parseInt(endTime)).toString()}
                      />
                      <RotaTableItemsSimple text={`${totalHours}`} />
                      <RotaTableItemsSimple
                        text={user ? user.name : "No User"}
                      />
                      <RotaTableItemsActions
                        onDelete={async () => {
                          await deleteBy({
                            variables: {
                              data: id
                            }
                          });
                          refetch();
                        }}
                        onUpdate={async () => {
                          await this._changeActionType("update");
                          this.setState(
                            {
                              selectedID: id,
                              initialValue: {
                                startTime: new Date(parseInt(startTime)),
                                endTime: new Date(parseInt(endTime)),
                                totalHours,
                                userID: this._getOptionalObjectID(user)
                              }
                            },
                            () => this._toggleModal()
                          );
                        }}
                      />
                    </tr>
                  );
                }}
                initialValue={initialValue}
                validationSchema={validateScheduleSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  if (actionType === "create") {
                    await create({
                      variables: {
                        data: {
                          ...values,
                          startTime: values.startTime.getTime().toString(),
                          endTime: values.endTime.getTime().toString()
                        }
                      }
                    });
                  } else {
                    await updateBy({
                      variables: {
                        id: selectedID,
                        data: {
                          ...values,
                          startTime: values.startTime.getTime().toString(),
                          endTime: values.endTime.getTime().toString()
                        }
                      }
                    });
                  }
                  refetch();
                  this._toggleModal();
                }}
                generateFormFields={() => {
                  return (
                    <>
                      <TextField
                        label="Start Time"
                        name="startTime"
                        placeholder="Start Time"
                        componentType="datetimepicker"
                      />
                      <TextField
                        label="End Time"
                        name="endTime"
                        placeholder="End Time"
                        componentType="datetimepicker"
                      />
                      <NumberField
                        label="Total Hours"
                        name="totalHours"
                        placeholder="Total Hours"
                        componentType="number"
                      />
                      <SelectField
                        label="User"
                        name="userID"
                        componentType="select"
                        options={
                          getAllUserByRole.length > 0
                            ? getAllUserByRole.map(({ id, name }) => ({
                                id,
                                title: name
                              }))
                            : []
                        }
                      />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      </GetAllScheduleComponent>
    );
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
  DeleteByScheduleIdHOC({ name: "deleteBy" }),
  UpdateByScheduleIdHOC({ name: "updateBy" }),
  CreateScheduleHOC({ name: "create" })
)(withAuth(Schedules));
