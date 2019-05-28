// javascipt plugin for creating charts
import React, { Component } from "react";
import { compose } from "react-apollo";
// reactstrap components
import {
  Button,
  Col,
  Container,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row
} from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Crud from "../components/Crud";
import {
  CheckBoxField,
  SelectField,
  TextField
} from "../components/FormFields";
import Header from "../components/Headers/Header";
import Loader from "../components/Loader";
import ModalHandlerHOC from "../components/ModalHandlerHOC";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple
} from "../components/RotaTable/RotaTableItems";
import {
  ApprovedUserMutationFn,
  CreateMultiScheduleHOC,
  CreateMultiScheduleMutationFn,
  CreateScheduleHOC,
  CreateScheduleInput,
  CreateScheduleMutationFn,
  DeleteByScheduleIdHOC,
  DeleteByScheduleIdMutationFn,
  GetAllAreaQuery,
  GetAllRoleNoAuthQuery,
  GetAllUserByFilterHOC,
  GetAllUserByFilterQuery,
  GetAllUserByFilterVariables,
  GetMySchedulesComponent,
  MeMe,
  ScheduleBasicFragmentFragment,
  UpdateByScheduleIdHOC,
  UpdateByScheduleIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import FlashMessage from "../lib/FlashMessage";
import { withAuth } from "../lib/withAuth";
import { formatTimeDate } from "../shared/helpersFunctions";
import { validateScheduleSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByScheduleIdMutationFn,
    UpdateByScheduleIdMutationFn,
    CreateScheduleMutationFn
  > {
  createMulti: CreateMultiScheduleMutationFn;
  me?: MeMe;
  getAllUserByFilter: GetAllUserByFilterQuery;
  getAllRoleNoAuth: GetAllRoleNoAuthQuery;
  getAllArea: GetAllAreaQuery;
  approvedUser: ApprovedUserMutationFn;
  variables?: GetAllUserByFilterVariables;
}

interface InitialValue {
  startTime: Date;
  endTime: Date;
  notes: string;
  coreShift: boolean;
  locumShift: boolean;
  staffName: string;
  roleID: string;
  areaID: string;
}

interface State {
  selectedDate: Date;
  isModalOpen: boolean;
  newNote: string;
}

class ManageSchedule extends Component<Props, State> {
  state: Readonly<State> = {
    selectedDate: new Date(),
    isModalOpen: false,
    newNote: ""
  };

  _pageTitle: string = "Schedule for";

  _months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];

  _years = (startYear: number): number[] => {
    const currentYear: number = new Date().getFullYear();
    const years: number[] = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
      years.push(startYear++);
    }
    return years;
  };

  _toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  _setTodayDate = (dateTime: Date) => {
    const { selectedDate } = this.state;
    dateTime.setDate(selectedDate.getDate());
    dateTime.setMonth(selectedDate.getMonth());
    dateTime.setFullYear(selectedDate.getFullYear());
    return dateTime;
  };

  dIDate = (type: number = 1) => {
    const { selectedDate } = this.state;
    this.setState({
      selectedDate: new Date(
        selectedDate.setDate(selectedDate.getDate() + type)
      )
    });
  };

  _decrementDate = () => this.dIDate(-1);

  _incrementDate = () => this.dIDate();

  render() {
    const {
      me,
      getAllUserByFilter: { getAllUserByFilter },
      deleteBy,
      updateBy,
      create,
      createMulti
    } = this.props;
    const { selectedDate, isModalOpen, newNote } = this.state;
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const flassMessage = new FlashMessage();
    return (
      <AdminLayout pageTitle={"Schedule Management"} me={me}>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <GetMySchedulesComponent
            variables={{ startDate: selectedDate.getTime() }}
            fetchPolicy="cache-and-network"
          >
            {({ data, loading, refetch }) => {
              if (loading) {
                return <Loader />;
              }
              return (
                <Row className="mt-5">
                  <Col className="mb-5" xl="12">
                    <ModalHandlerHOC<InitialValue>
                      initialValue={{
                        startTime: new Date(),
                        endTime: new Date(),
                        notes: "",
                        coreShift: false,
                        locumShift: false,
                        staffName: "",
                        roleID: "",
                        areaID: ""
                      }}
                      children={({
                        toggleModal,
                        modal,
                        changeActionType,
                        getActionType,
                        getOptionalObjectID,
                        initialValue,
                        updateInitialValue,
                        getSelectedValue
                      }) => {
                        return (
                          <Crud<ScheduleBasicFragmentFragment, InitialValue>
                            isCreate={true}
                            createLocation="bottom-left"
                            isFilters={true}
                            filters={{
                              isAreaFilter: true,
                              isTypeFilter: true
                            }}
                            renderTypes={() =>
                              me &&
                              me.department &&
                              me.department.roles &&
                              me.department.roles.length > 0
                                ? me.department.roles.map(({ id, title }) => {
                                    return (
                                      <option key={id} value={id}>
                                        {title}
                                      </option>
                                    );
                                  })
                                : []
                            }
                            renderAreas={() =>
                              me &&
                              me.department &&
                              me.department.areas &&
                              me.department.areas.length > 0
                                ? me.department.areas.map(({ id, title }) => {
                                    return (
                                      <option key={id} value={id}>
                                        {title}
                                      </option>
                                    );
                                  })
                                : []
                            }
                            toggleModal={toggleModal}
                            isModalOpen={modal}
                            pageTitle={() => {
                              return (
                                <div className="d-flex align-items-center">
                                  <div className="mr-3">
                                    <span className="mr-2">
                                      {this._pageTitle}
                                    </span>
                                    <Button
                                      className="mr-3 p-3 btn-rounded"
                                      onClick={this._decrementDate}
                                    >
                                      <i className="fas fa-arrow-left" />
                                    </Button>
                                    <span>{selectedDate.getDate()}</span>
                                    <Button
                                      className="ml-3 p-3 btn-rounded"
                                      onClick={this._incrementDate}
                                    >
                                      <i className="fas fa-arrow-right" />
                                    </Button>
                                  </div>
                                  <div className="mr-3">
                                    <Input
                                      type="select"
                                      className="form-control-alternative"
                                      value={selectedDate.getMonth()}
                                      onChange={(ev: any) =>
                                        ev.target.value
                                          ? this.setState({
                                              selectedDate: new Date(
                                                selectedDate.setMonth(
                                                  ev.target.value
                                                )
                                              )
                                            })
                                          : null
                                      }
                                    >
                                      {this._months.map((m, i) => (
                                        <option key={i} value={i}>
                                          {m}
                                        </option>
                                      ))}
                                    </Input>
                                  </div>
                                  <div className="mr-3">
                                    <Input
                                      type="select"
                                      className="form-control-alternative"
                                      value={selectedDate.getFullYear()}
                                      onChange={(ev: any) =>
                                        ev.target.value
                                          ? this.setState({
                                              selectedDate: new Date(
                                                selectedDate.setFullYear(
                                                  ev.target.value
                                                )
                                              )
                                            })
                                          : null
                                      }
                                    >
                                      {this._years(
                                        new Date().getFullYear() - 30
                                      ).map(y => (
                                        <option key={y} value={y}>
                                          {y}
                                        </option>
                                      ))}
                                    </Input>
                                  </div>
                                  <div>
                                    <Button
                                      color="primary"
                                      size="sm"
                                      onClick={async () => {
                                        const newData: CreateScheduleInput[] = [];
                                        if (
                                          data &&
                                          data.getMySchedules.length > 0
                                        ) {
                                          data.getMySchedules.map(
                                            ({
                                              __typename,
                                              id,
                                              staff,
                                              role,
                                              area,
                                              startTime,
                                              endTime,
                                              ...s
                                            }) => {
                                              const startTimeDate = new Date(
                                                startTime
                                              );
                                              const endTimeDate = new Date(
                                                endTime
                                              );
                                              newData.push({
                                                ...s,
                                                roleID: role.id,
                                                areaID: area.id,
                                                staffID: "",
                                                startTime: startTimeDate.setDate(
                                                  startTimeDate.getDate() + 1
                                                ),
                                                endTime: endTimeDate.setDate(
                                                  endTimeDate.getDate() + 1
                                                ),
                                                departmentID: me.department.id
                                              });
                                            }
                                          );
                                        }
                                        await createMulti({
                                          variables: {
                                            data: [...newData]
                                          }
                                        });
                                        flassMessage.text =
                                          "Successfully added repeat data.";
                                        flassMessage.type = "success";
                                        flassMessage.show();
                                      }}
                                    >
                                      Repeat for{" "}
                                      {formatTimeDate(
                                        nextDay.getTime(),
                                        "date"
                                      )}
                                    </Button>
                                  </div>
                                </div>
                              );
                            }}
                            items={
                              data && data.getMySchedules.length > 0
                                ? data.getMySchedules
                                : []
                            }
                            fields={[
                              "Start Time",
                              "End Time",
                              "Core Shift",
                              "Locum Shift",
                              "Role",
                              "Area",
                              "Select Name",
                              "",
                              ""
                            ]}
                            loading={false}
                            changeActionType={changeActionType}
                            getActionType={getActionType}
                            renderItem={({
                              id,
                              startTime,
                              endTime,
                              coreShift,
                              locumShift,
                              staffName,
                              notes,
                              role,
                              area,
                              staff
                            }) => {
                              return (
                                <tr key={id}>
                                  <RotaTableItemsSimple
                                    text={formatTimeDate(startTime)}
                                  />
                                  <RotaTableItemsSimple
                                    text={formatTimeDate(endTime)}
                                  />
                                  <RotaTableItemsSimple
                                    text={coreShift ? "yes" : "no"}
                                  />
                                  <RotaTableItemsSimple
                                    text={locumShift ? "yes" : "no"}
                                  />
                                  <RotaTableItemsSimple text={role.title} />
                                  <RotaTableItemsSimple text={area.title} />
                                  {locumShift ? (
                                    <RotaTableItemsSimple text={staffName} />
                                  ) : (
                                    <td>
                                      <Input
                                        type="select"
                                        className="form-control-alternative"
                                        value={staff ? staff.id : ""}
                                        onChange={async (e: any) => {
                                          if (e.target.value !== "") {
                                            await updateBy({
                                              variables: {
                                                id: id,
                                                data: {
                                                  startTime,
                                                  endTime,
                                                  coreShift,
                                                  roleID: role.id,
                                                  areaID: area.id,
                                                  staffID: e.target.value
                                                }
                                              }
                                            });
                                          }
                                        }}
                                      >
                                        <option value="">-----</option>
                                        {getAllUserByFilter &&
                                          getAllUserByFilter.map(
                                            ({ id, name }) => {
                                              return (
                                                <option key={id} value={id}>
                                                  {name}
                                                </option>
                                              );
                                            }
                                          )}
                                      </Input>
                                    </td>
                                  )}
                                  <td>
                                    <Button
                                      color="primary"
                                      size="sm"
                                      onClick={this._toggleModal}
                                    >
                                      Notes
                                    </Button>
                                    <Modal
                                      isOpen={isModalOpen}
                                      toggle={this._toggleModal}
                                      size="lg"
                                    >
                                      <ModalHeader toggle={this._toggleModal}>
                                        Notes
                                      </ModalHeader>
                                      <ModalBody>
                                        <div>{notes}</div>
                                        <div>
                                          <Input
                                            type="textarea"
                                            className="form-control-alternative"
                                            value={newNote}
                                            onChange={e => {
                                              this.setState({
                                                newNote: e.target.value
                                              });
                                            }}
                                          />
                                        </div>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          type="button"
                                          color="primary"
                                          onClick={async e => {
                                            await updateBy({
                                              variables: {
                                                id: id,
                                                data: {
                                                  startTime,
                                                  endTime,
                                                  coreShift,
                                                  roleID: role.id,
                                                  areaID: area.id,
                                                  notes: newNote
                                                }
                                              }
                                            });
                                            this._toggleModal();
                                          }}
                                        >
                                          Submit
                                        </Button>
                                        <Button
                                          color="secondary"
                                          onClick={this._toggleModal}
                                        >
                                          Cancel
                                        </Button>
                                      </ModalFooter>
                                    </Modal>
                                  </td>
                                  {/* <RotaTableItemsSimple text={staff.name} /> */}
                                  <RotaTableItemsActions
                                    onDelete={async () => {
                                      await deleteBy({
                                        variables: {
                                          data: id
                                        }
                                      });
                                      refetch();
                                    }}
                                  />
                                </tr>
                              );
                            }}
                            initialValue={initialValue}
                            validationSchema={validateScheduleSchema}
                            onSubmit={async (
                              {
                                startTime,
                                endTime,
                                notes,
                                coreShift,
                                locumShift,
                                staffName,
                                roleID,
                                areaID
                              },
                              { setSubmitting }
                            ) => {
                              setSubmitting(true);
                              if (getActionType() === "create") {
                                await create({
                                  variables: {
                                    data: {
                                      startTime: this._setTodayDate(
                                        startTime
                                      ).getTime(),
                                      endTime: this._setTodayDate(
                                        endTime
                                      ).getTime(),
                                      notes,
                                      coreShift,
                                      locumShift,
                                      staffName,
                                      roleID,
                                      areaID,
                                      departmentID: me.department.id
                                    }
                                  }
                                });
                              }
                              refetch();
                              toggleModal();
                            }}
                            generateFormFields={iValues => {
                              return (
                                <>
                                  <TextField
                                    label="Start Time"
                                    name="startTime"
                                    placeholder="Start Time"
                                    componentType="timepicker"
                                  />
                                  <TextField
                                    label="End Time"
                                    name="endTime"
                                    placeholder="End Time"
                                    componentType="timepicker"
                                  />
                                  <CheckBoxField
                                    label="Core Shift"
                                    name="coreShift"
                                    placeholder="Core Shift"
                                    componentType="checkbox"
                                  />
                                  <CheckBoxField
                                    label="Locum Shift"
                                    name="locumShift"
                                    placeholder="Locum Shift"
                                    componentType="checkbox"
                                  />
                                  <TextField
                                    label="Notes"
                                    name="notes"
                                    placeholder="Notes"
                                    componentType="text"
                                  />
                                  {iValues.locumShift && (
                                    <TextField
                                      label="Staff Name"
                                      name="staffName"
                                      placeholder="Staff Name"
                                      componentType="text"
                                    />
                                  )}
                                  <SelectField
                                    label="Role"
                                    name="roleID"
                                    componentType="select"
                                    options={
                                      me &&
                                      me.department &&
                                      me.department.roles &&
                                      me.department.roles.length > 0
                                        ? me.department.roles.map(
                                            ({ id, title }) => ({
                                              id,
                                              title
                                            })
                                          )
                                        : []
                                    }
                                  />
                                  <SelectField
                                    label="Area"
                                    name="areaID"
                                    componentType="select"
                                    options={
                                      me &&
                                      me.department &&
                                      me.department.areas &&
                                      me.department.areas.length > 0
                                        ? me.department.areas.map(
                                            ({ id, title }) => ({
                                              id,
                                              title
                                            })
                                          )
                                        : []
                                    }
                                  />
                                </>
                              );
                            }}
                          />
                        );
                      }}
                    />
                  </Col>
                  {/* <Col className="mb-5" xl="12">
                <ApprovedStaffRequest {...this.props} />
              </Col> */}
                </Row>
              );
            }}
          </GetMySchedulesComponent>
        </Container>
      </AdminLayout>
    );
  }
}

export default compose(
  GetAllUserByFilterHOC({
    name: "getAllUserByFilter",
    options: {
      variables: {
        data: {
          roleType: "*",
          approved: true
        }
      }
    }
  }),
  DeleteByScheduleIdHOC({ name: "deleteBy" }),
  UpdateByScheduleIdHOC({ name: "updateBy" }),
  CreateScheduleHOC({ name: "create" }),
  CreateMultiScheduleHOC({ name: "createMulti" })
)(withAuth(ManageSchedule));

// export default withAuth(ManageSchedule);
