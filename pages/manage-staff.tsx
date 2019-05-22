// javascipt plugin for creating charts
import React, { Component } from "react";
import { compose } from "react-apollo";
// reactstrap components
import { Col, Container, Row } from "reactstrap";
import AdminLayout from "../components/AdminLayout";
import Crud from "../components/Crud";
import {
  PasswordField,
  SelectField,
  TextField
} from "../components/FormFields";
import Header from "../components/Headers/Header";
import ModalHandlerHOC from "../components/ModalHandlerHOC";
import UserTableRow from "../components/UserTableRow";
import {
  ApprovedUserHOC,
  ApprovedUserMutationFn,
  CreateUserHOC,
  CreateUserMutationFn,
  DeleteByUserIdHOC,
  DeleteByUserIdMutationFn,
  GetAllAreaHOC,
  GetAllAreaQuery,
  GetAllRoleNoAuthHOC,
  GetAllRoleNoAuthQuery,
  GetAllUserByFilterComponent,
  GetAllUserByFilterVariables,
  GetAllUserGetAllUser,
  MeMe,
  UpdateByUserIdHOC,
  UpdateByUserIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { withAuth } from "../lib/withAuth";
import { validateRegisterSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByUserIdMutationFn,
    UpdateByUserIdMutationFn,
    CreateUserMutationFn
  > {
  me?: MeMe;
  getAllRoleNoAuth: GetAllRoleNoAuthQuery;
  getAllArea: GetAllAreaQuery;
  approvedUser: ApprovedUserMutationFn;
  variables?: GetAllUserByFilterVariables;
}

class ManageStaff extends Component<Props> {
  render() {
    const { me } = this.props;
    console.log(me);
    return (
      <AdminLayout pageTitle="Manage Staff" me={me}>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row className="mt-5">
            <Col className="mb-5" xl="12">
              <RegisteredStaff {...this.props} />
            </Col>
            <Col className="mb-5" xl="12">
              <ApprovedStaffRequest {...this.props} />
            </Col>
          </Row>
        </Container>
      </AdminLayout>
    );
  }
}

export default compose(
  GetAllRoleNoAuthHOC({ name: "getAllRoleNoAuth" }),
  GetAllAreaHOC({ name: "getAllArea" }),
  DeleteByUserIdHOC({ name: "deleteBy" }),
  UpdateByUserIdHOC({ name: "updateBy" }),
  CreateUserHOC({ name: "create" }),
  ApprovedUserHOC({ name: "approvedUser" })
)(withAuth(ManageStaff));

// export default withAuth(ManageStaff);

interface InitialValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleID: string;
  areaID?: string;
}

class RegisteredStaff extends Component<Props> {
  render() {
    const {
      me,
      getAllRoleNoAuth: { getAllRoleNoAuth },
      getAllArea: { getAllArea },
      create,
      updateBy,
      deleteBy
    } = this.props;
    return (
      <GetAllUserByFilterComponent
        variables={{
          data: {
            roleType: "*",
            approved: true
          }
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, refetch }) => {
          return (
            <ModalHandlerHOC<InitialValue>
              initialValue={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phone: "",
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
                  <Crud<GetAllUserGetAllUser, InitialValue>
                    isFilters={true}
                    filters={{
                      isAreaFilter: true,
                      isTypeFilter: true
                    }}
                    me={me}
                    toggleModal={toggleModal}
                    isModalOpen={modal}
                    pageTitle={"Registered Staff"}
                    items={data.getAllUserByFilter}
                    fields={[
                      "name",
                      "area",
                      "designation",
                      "phone",
                      "email",
                      ""
                    ]}
                    loading={loading}
                    changeActionType={changeActionType}
                    getActionType={getActionType}
                    renderItem={item => {
                      return (
                        <UserTableRow
                          key={item.id}
                          item={item}
                          onDelete={async () => {
                            await deleteBy({
                              variables: {
                                data: item.id
                              }
                            });
                            refetch();
                          }}
                          onUpdate={async () => {
                            const {
                              id,
                              firstName,
                              lastName,
                              email,
                              password,
                              phone,
                              role,
                              area
                            } = item;
                            await changeActionType("update");
                            updateInitialValue(
                              id,
                              {
                                firstName,
                                lastName,
                                email,
                                password,
                                phone,
                                roleID: getOptionalObjectID(role),
                                areaID: getOptionalObjectID(area)
                              },
                              toggleModal
                            );
                          }}
                        />
                      );
                    }}
                    initialValue={initialValue}
                    validationSchema={validateRegisterSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true);
                      if (getActionType() === "create") {
                        await create({
                          variables: {
                            data: values
                          }
                        });
                      } else {
                        await updateBy({
                          variables: {
                            id: getSelectedValue(),
                            data: values
                          }
                        });
                      }
                      refetch();
                      toggleModal();
                    }}
                    generateFormFields={() => {
                      return (
                        <>
                          <TextField
                            label="First Name"
                            name="firstName"
                            placeholder="First Name"
                            componentType="text"
                          />
                          <TextField
                            label="Last Name"
                            name="lastName"
                            placeholder="Last Name"
                            componentType="text"
                          />
                          <TextField
                            label="Email"
                            name="email"
                            placeholder="Email"
                            componentType="email"
                          />
                          <TextField
                            label="Phone"
                            name="phone"
                            placeholder="Phone"
                            componentType="text"
                          />
                          <PasswordField
                            label="Password"
                            name="password"
                            placeholder="Password"
                            componentType="password"
                          />
                          <SelectField
                            label="Role"
                            name="roleID"
                            componentType="select"
                            options={
                              getAllRoleNoAuth.length > 0
                                ? getAllRoleNoAuth
                                    .filter(({ title }) => title !== "Manager")
                                    .map(({ id, title }) => ({
                                      id,
                                      title
                                    }))
                                : []
                            }
                          />
                          <SelectField
                            label="Area"
                            name="areaID"
                            componentType="select"
                            options={
                              getAllArea.length > 0
                                ? getAllArea.map(({ id, title }) => ({
                                    id,
                                    title
                                  }))
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
          );
        }}
      </GetAllUserByFilterComponent>
    );
  }
}

class ApprovedStaffRequest extends Component<Props> {
  render() {
    const {
      me,
      getAllRoleNoAuth: { getAllRoleNoAuth },
      getAllArea: { getAllArea },
      create,
      updateBy
    } = this.props;
    return (
      <GetAllUserByFilterComponent
        variables={{
          data: {
            roleType: "*",
            approved: false
          }
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, refetch }) => {
          return (
            <ModalHandlerHOC<InitialValue>
              initialValue={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                phone: "",
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
                getSelectedValue
              }) => {
                return (
                  <Crud<GetAllUserGetAllUser, InitialValue>
                    isCreate={true}
                    me={me}
                    toggleModal={toggleModal}
                    isModalOpen={modal}
                    pageTitle={"Approved Staff Request"}
                    items={data.getAllUserByFilter}
                    fields={[
                      "name",
                      "area",
                      "designation",
                      "phone",
                      "email",
                      ""
                    ]}
                    loading={loading}
                    changeActionType={changeActionType}
                    getActionType={getActionType}
                    renderItem={item => {
                      return (
                        <UserTableRow
                          key={item.id}
                          item={item}
                          onApprove={async () => {
                            const {
                              id,
                              firstName,
                              lastName,
                              email,
                              password,
                              phone,
                              role,
                              area
                            } = item;
                            await updateBy({
                              variables: {
                                id,
                                data: {
                                  firstName,
                                  lastName,
                                  email,
                                  password,
                                  phone,
                                  appproved: true,
                                  roleID: getOptionalObjectID(role),
                                  areaID: getOptionalObjectID(area)
                                }
                              }
                            });
                            refetch();
                          }}
                          onDecline={async () => {
                            const {
                              id,
                              firstName,
                              lastName,
                              email,
                              password,
                              phone,
                              role,
                              area
                            } = item;
                            await updateBy({
                              variables: {
                                id,
                                data: {
                                  firstName,
                                  lastName,
                                  email,
                                  password,
                                  phone,
                                  appproved: false,
                                  roleID: getOptionalObjectID(role),
                                  areaID: getOptionalObjectID(area)
                                }
                              }
                            });
                            refetch();
                          }}
                        />
                      );
                    }}
                    initialValue={initialValue}
                    validationSchema={validateRegisterSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                      setSubmitting(true);
                      if (getActionType() === "create") {
                        await create({
                          variables: {
                            data: values
                          }
                        });
                      } else {
                        await updateBy({
                          variables: {
                            id: getSelectedValue(),
                            data: values
                          }
                        });
                      }
                      refetch();
                      toggleModal();
                    }}
                    generateFormFields={() => {
                      return (
                        <>
                          <TextField
                            label="First Name"
                            name="firstName"
                            placeholder="First Name"
                            componentType="text"
                          />
                          <TextField
                            label="Last Name"
                            name="lastName"
                            placeholder="Last Name"
                            componentType="text"
                          />
                          <TextField
                            label="Email"
                            name="email"
                            placeholder="Email"
                            componentType="email"
                          />
                          <TextField
                            label="Phone"
                            name="phone"
                            placeholder="Phone"
                            componentType="text"
                          />
                          <PasswordField
                            label="Password"
                            name="password"
                            placeholder="Password"
                            componentType="password"
                          />
                          <SelectField
                            label="Role"
                            name="roleID"
                            componentType="select"
                            options={
                              getAllRoleNoAuth.length > 0
                                ? getAllRoleNoAuth
                                    .filter(({ title }) => title !== "Manager")
                                    .map(({ id, title }) => ({
                                      id,
                                      title
                                    }))
                                : []
                            }
                          />
                          <SelectField
                            label="Area"
                            name="areaID"
                            componentType="select"
                            options={
                              getAllArea.length > 0
                                ? getAllArea.map(({ id, title }) => ({
                                    id,
                                    title
                                  }))
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
          );
        }}
      </GetAllUserByFilterComponent>
    );
  }
}

// class ApprovedStaffRequest extends Component<Props> {
//   render() {
//     const { me } = this.props;
//     const variables: GetAllUserByFilterVariables = {
//       data: {
//         roleType: "*",
//         approved: false
//       }
//     };
//     return (
//       <Users
//         me={me}
//         pageTitle="Approved Staff Request"
//         variables={variables}
//         isCreate={true}
//         isApprove={true}
//         isDecline={true}
//       />
//     );
//   }
// }
