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
import { SelectField, TextField } from "../components/FormFields";
import Header from "../components/Headers/Header";
import Loader from "../components/Loader";
import ModalHandlerHOC from "../components/ModalHandlerHOC";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple
} from "../components/RotaTable/RotaTableItems";
import {
  ApprovedUserMutationFn,
  CreateScheduleHOC,
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
import { withAuth } from "../lib/withAuth";
import { validateRoleIDSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByScheduleIdMutationFn,
    UpdateByScheduleIdMutationFn,
    CreateScheduleMutationFn
  > {
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
  startDay: number;
  notes: string;
  coreShift: string;
  staffID: string;
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

  render() {
    const {
      me,
      getAllUserByFilter: { getAllUserByFilter },
      deleteBy,
      updateBy,
      create
    } = this.props;
    const { selectedDate, isModalOpen, newNote } = this.state;
    return (
      <AdminLayout pageTitle={"Schedule Management"} me={me}>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <GetMySchedulesComponent
            variables={{ startDay: selectedDate.getDate() }}
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
                        startDay: selectedDate.getDate(),
                        notes: "",
                        coreShift: "",
                        staffID: "",
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
                                      onClick={() =>
                                        this.setState({
                                          selectedDate: new Date(
                                            selectedDate.setDate(
                                              selectedDate.getDate() - 1
                                            )
                                          )
                                        })
                                      }
                                    >
                                      <i className="fas fa-arrow-left" />
                                    </Button>
                                    <span>{selectedDate.getDate()}</span>
                                    <Button
                                      className="ml-3 p-3 btn-rounded"
                                      onClick={() =>
                                        this.setState({
                                          selectedDate: new Date(
                                            selectedDate.setDate(
                                              selectedDate.getDate() + 1
                                            )
                                          )
                                        })
                                      }
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
                                        this.setState({
                                          selectedDate: new Date(
                                            selectedDate.setMonth(
                                              ev.target.value
                                            )
                                          )
                                        })
                                      }
                                    >
                                      {this._months.map((m, i) => (
                                        <option key={i} value={i}>
                                          {m}
                                        </option>
                                      ))}
                                    </Input>
                                  </div>
                                  <div>
                                    <Input
                                      type="select"
                                      className="form-control-alternative"
                                      value={selectedDate.getFullYear()}
                                      onChange={(ev: any) =>
                                        this.setState({
                                          selectedDate: new Date(
                                            selectedDate.setFullYear(
                                              ev.target.value
                                            )
                                          )
                                        })
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
                              "Role",
                              "Area",
                              "Select Name",
                              ""
                            ]}
                            loading={false}
                            changeActionType={changeActionType}
                            getActionType={getActionType}
                            renderItem={({
                              id,
                              startTime,
                              endTime,
                              startDay,
                              coreShift,
                              notes,
                              role,
                              area,
                              staff
                            }) => {
                              return (
                                <tr key={id}>
                                  <RotaTableItemsSimple text={startTime} />
                                  <RotaTableItemsSimple text={endTime} />
                                  <RotaTableItemsSimple text={coreShift} />
                                  <RotaTableItemsSimple text={role.title} />
                                  <RotaTableItemsSimple text={area.title} />
                                  <td>
                                    <div className="d-flex">
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
                                                  startDay,
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
                                                    startDay,
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
                                    </div>
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
                            validationSchema={validateRoleIDSchema}
                            onSubmit={async (
                              {
                                startTime,
                                endTime,
                                startDay,
                                notes,
                                coreShift,
                                staffID,
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
                                      startTime: startTime.getTime().toString(),
                                      endTime: endTime.getTime().toString(),
                                      startDay,
                                      notes,
                                      coreShift,
                                      staffID,
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
                                    componentType="datetimepicker"
                                  />
                                  <TextField
                                    label="End Time"
                                    name="endTime"
                                    placeholder="End Time"
                                    componentType="datetimepicker"
                                  />
                                  <TextField
                                    label="Core Shift"
                                    name="coreShift"
                                    placeholder="Core Shift"
                                    componentType="text"
                                  />
                                  <TextField
                                    label="Notes"
                                    name="notes"
                                    placeholder="Notes"
                                    componentType="text"
                                  />
                                  <SelectField
                                    label="Staff"
                                    name="staffID"
                                    componentType="select"
                                    options={
                                      []
                                      // getAllUserByRole.length > 0
                                      //   ? getAllUserByRole.map(({ id, name }) => ({
                                      //       id,
                                      //       title: name
                                      //     }))
                                      //   : []
                                    }
                                  />
                                  <SelectField
                                    label="Role"
                                    name="roleID"
                                    componentType="select"
                                    options={
                                      []
                                      // getAllUserByRole.length > 0
                                      //   ? getAllUserByRole.map(({ id, name }) => ({
                                      //       id,
                                      //       title: name
                                      //     }))
                                      //   : []
                                    }
                                  />
                                  <SelectField
                                    label="Area"
                                    name="areaID"
                                    componentType="select"
                                    options={
                                      []
                                      // getAllUserByRole.length > 0
                                      //   ? getAllUserByRole.map(({ id, name }) => ({
                                      //       id,
                                      //       title: name
                                      //     }))
                                      //   : []
                                    }
                                  />
                                </>
                                // <FieldArray
                                //   name="roleIDField"
                                //   render={({ insert, remove }) => {
                                //     if (!iValues && !iValues.roleIDField) {
                                //       return null;
                                //     }
                                //     if (iValues.roleIDField.length <= 0) {
                                //       return null;
                                //     }
                                //     return iValues.roleIDField.map((_, i) => {
                                //       return (
                                //         <Fragment key={i}>
                                //           <Col lg="12">
                                //             <Row className="align-items-center">
                                //               <Col lg="10">
                                //                 <Row>
                                //                   <SelectField
                                //                     label="Roles"
                                //                     name={`roleIDField.${i}.roleID`}
                                //                     componentType="select"
                                //                     options={[
                                //                       ...(getAllRoleNoAuth.length > 0
                                //                         ? getAllRoleNoAuth
                                //                             .filter(
                                //                               ({ title }) =>
                                //                                 title !== "Manager"
                                //                             )
                                //                             .map(({ id, title }) => ({
                                //                               id,
                                //                               title
                                //                             }))
                                //                         : []),
                                //                       {
                                //                         id: "other",
                                //                         title: "Other"
                                //                       }
                                //                     ]}
                                //                   />
                                //                   {iValues.roleIDField[i].roleID ===
                                //                     "other" && (
                                //                     <TextField
                                //                       label="Title"
                                //                       name={`roleIDField.${i}.title`}
                                //                       placeholder="Title"
                                //                       componentType="text"
                                //                     />
                                //                   )}
                                //                 </Row>
                                //               </Col>
                                //               <Col className="d-flex justify-content-end">
                                //                 {iValues.roleIDField.length > 1 && (
                                //                   <Button
                                //                     color="primary"
                                //                     onClick={() => remove(i)}
                                //                     size="sm"
                                //                   >
                                //                     <i className="fas fa-minus" />
                                //                   </Button>
                                //                 )}
                                //                 <Button
                                //                   color="primary"
                                //                   onClick={() =>
                                //                     insert(i, { roleID: "", title: "" })
                                //                   }
                                //                   size="sm"
                                //                 >
                                //                   <i className="fas fa-plus" />
                                //                 </Button>
                                //               </Col>
                                //             </Row>
                                //           </Col>
                                //         </Fragment>
                                //       );
                                //     });
                                //   }}
                                // />
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
  CreateScheduleHOC({ name: "create" })
)(withAuth(ManageSchedule));

// export default withAuth(ManageSchedule);
