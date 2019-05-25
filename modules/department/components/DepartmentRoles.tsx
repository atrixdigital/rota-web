import { FieldArray } from "formik";
import { Component, Fragment } from "react";
import { compose } from "react-apollo";
import { Button, Col, Input, Row } from "reactstrap";
import Crud from "../../../components/Crud";
import { SelectField, TextField } from "../../../components/FormFields";
import ModalHandlerHOC from "../../../components/ModalHandlerHOC";
import { RotaTableItemsTitle } from "../../../components/RotaTable/RotaTableItems";
import {
  AssignDepartmentRolesHOC,
  AssignDepartmentRolesMutationFn,
  CreateRoleHOC,
  CreateRoleMutationFn,
  DepartmentBasicFragmentFragment,
  DepartmentBasicFragmentRoles,
  GetAllRoleNoAuthHOC,
  GetAllRoleNoAuthQuery,
  GetDepartmentQuery,
  GetDepartmentVariables,
  RemoveDepartmentRolesHOC,
  RemoveDepartmentRolesMutationFn
} from "../../../generated/apolloComponent";
import { withRefetch } from "../../../interfaces";
import FlashMessage from "../../../lib/FlashMessage";
import { validateRoleIDSchema } from "../../../shared/validation-schema";

interface Props
  extends withRefetch<GetDepartmentVariables, GetDepartmentQuery> {
  roles: DepartmentBasicFragmentRoles[];
  getAllRoleNoAuth: GetAllRoleNoAuthQuery;
  createRole: CreateRoleMutationFn;
  assignDepartmentRoles: AssignDepartmentRolesMutationFn;
  removeDepartmentRoles: RemoveDepartmentRolesMutationFn;
  department: DepartmentBasicFragmentFragment;
}

interface RoleField {
  roleID: string;
  title?: string;
}

interface InitialValue {
  roleIDField: RoleField[];
}

interface State {
  selectedIDs: string[];
}

class DepartmentRoles extends Component<Props, State> {
  state: Readonly<State> = {
    selectedIDs: []
  };

  render() {
    const {
      roles,
      refetch,
      getAllRoleNoAuth: { getAllRoleNoAuth },
      createRole,
      assignDepartmentRoles,
      removeDepartmentRoles,
      department
    } = this.props;
    const { selectedIDs } = this.state;
    const flassMessage = new FlashMessage();
    return (
      <ModalHandlerHOC<InitialValue>
        initialValue={{
          roleIDField: [{ roleID: "", title: "" }]
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
            <Crud<DepartmentBasicFragmentRoles, InitialValue>
              isCreate={true}
              onDelete={async () => {
                if (selectedIDs.length > 0) {
                  await removeDepartmentRoles({
                    variables: {
                      data: {
                        departmentID: department.id,
                        roleIDs: selectedIDs
                      }
                    }
                  });
                  refetch();
                } else {
                  flassMessage.text = "Please select atleast one role";
                  flassMessage.show();
                }
              }}
              toggleModal={toggleModal}
              isModalOpen={modal}
              pageTitle={"Assigned Roles"}
              items={roles}
              fields={["", "title"]}
              loading={false}
              changeActionType={changeActionType}
              getActionType={getActionType}
              renderItem={({ id, title }) => {
                return (
                  <tr key={id}>
                    <td>
                      <div style={{ marginBottom: "1rem" }}>
                        <Input
                          type="checkbox"
                          style={{ marginLeft: "0.2rem" }}
                          onChange={ev => {
                            if (ev.target.checked) {
                              // add
                              this.setState(() => ({
                                selectedIDs: [...selectedIDs, id]
                              }));
                            } else {
                              // remove
                              const newData = [...selectedIDs];
                              newData.splice(
                                selectedIDs.findIndex(v => v === id),
                                1
                              );
                              this.setState({
                                selectedIDs: [...newData]
                              });
                            }
                          }}
                        />
                      </div>
                    </td>
                    <RotaTableItemsTitle title={title} />
                  </tr>
                );
              }}
              initialValue={initialValue}
              validationSchema={validateRoleIDSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                if (getActionType() === "create") {
                  if (values.roleIDField.length > 0) {
                    const idsToAssign: string[] = [];
                    await Promise.all(
                      values.roleIDField.map(async ({ roleID, title }) => {
                        if (roleID === "other") {
                          // create and assign here
                          const role = await createRole({
                            variables: {
                              data: {
                                title
                              }
                            }
                          });
                          if (role && role.data && role.data.createRole) {
                            roleID = role.data.createRole.id;
                          }
                        }
                        idsToAssign.push(roleID);
                      })
                    );
                    await assignDepartmentRoles({
                      variables: {
                        data: {
                          departmentID: department.id,
                          roleIDs: [...idsToAssign]
                        }
                      }
                    });
                  }
                } else {
                  //   // await updateBy({
                  //   //   variables: {
                  //   //     id: getSelectedValue(),
                  //   //     data: values
                  //   //   }
                  //   // });
                }
                refetch();
                toggleModal();
              }}
              generateFormFields={iValues => {
                return (
                  <FieldArray
                    name="roleIDField"
                    render={({ insert, remove }) => {
                      if (!iValues && !iValues.roleIDField) {
                        return null;
                      }
                      if (iValues.roleIDField.length <= 0) {
                        return null;
                      }
                      return iValues.roleIDField.map((_, i) => {
                        return (
                          <Fragment key={i}>
                            <Col lg="12">
                              <Row className="align-items-center">
                                <Col lg="10">
                                  <Row>
                                    <SelectField
                                      label="Roles"
                                      name={`roleIDField.${i}.roleID`}
                                      componentType="select"
                                      options={[
                                        ...(getAllRoleNoAuth.length > 0
                                          ? getAllRoleNoAuth
                                              .filter(
                                                ({ title }) =>
                                                  title !== "Manager"
                                              )
                                              .map(({ id, title }) => ({
                                                id,
                                                title
                                              }))
                                          : []),
                                        {
                                          id: "other",
                                          title: "Other"
                                        }
                                      ]}
                                    />
                                    {iValues.roleIDField[i].roleID ===
                                      "other" && (
                                      <TextField
                                        label="Title"
                                        name={`roleIDField.${i}.title`}
                                        placeholder="Title"
                                        componentType="text"
                                      />
                                    )}
                                  </Row>
                                </Col>
                                <Col className="d-flex justify-content-end">
                                  {iValues.roleIDField.length > 1 && (
                                    <Button
                                      color="primary"
                                      onClick={() => remove(i)}
                                      size="sm"
                                    >
                                      <i className="fas fa-minus" />
                                    </Button>
                                  )}
                                  <Button
                                    color="primary"
                                    onClick={() =>
                                      insert(i, { roleID: "", title: "" })
                                    }
                                    size="sm"
                                  >
                                    <i className="fas fa-plus" />
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                          </Fragment>
                        );
                      });
                    }}
                  />
                );
              }}
            />
          );
        }}
      />
    );
  }
}

export default compose(
  GetAllRoleNoAuthHOC({
    name: "getAllRoleNoAuth",
    options: { fetchPolicy: "cache-and-network" }
  }),
  CreateRoleHOC({ name: "createRole" }),
  AssignDepartmentRolesHOC({ name: "assignDepartmentRoles" }),
  RemoveDepartmentRolesHOC({ name: "removeDepartmentRoles" })
)(DepartmentRoles);
