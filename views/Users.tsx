import { Component } from "react";
import { compose } from "react-apollo";
import Crud from "../components/Crud";
import {
  PasswordField,
  SelectField,
  TextField
} from "../components/FormFields";
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
  UpdateByUserIdHOC,
  UpdateByUserIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { validateRegisterSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByUserIdMutationFn,
    UpdateByUserIdMutationFn,
    CreateUserMutationFn
  > {
  getAllRoleNoAuth: GetAllRoleNoAuthQuery;
  getAllArea: GetAllAreaQuery;
  approvedUser: ApprovedUserMutationFn;
  variables?: GetAllUserByFilterVariables;
  pageTitle: string;
  fields?: string[];
  isCreate?: boolean;
  isFilters?: boolean;
  filters?: any;
  isUpdate?: boolean;
  isDelete?: boolean;
  isApprove?: boolean;
  isDecline?: boolean;
}

interface State {
  modal: boolean;
  actionType: string;
  initialValue: InitialValue;
  selectedID: string;
}

interface InitialValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  roleID: string;
  areaID?: string;
}

class Users extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    actionType: "create",
    initialValue: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      roleID: "",
      areaID: ""
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
      getAllRoleNoAuth: { getAllRoleNoAuth },
      getAllArea: { getAllArea },
      create,
      updateBy,
      deleteBy,
      approvedUser,
      me,
      variables,
      pageTitle,
      fields,
      isCreate,
      isFilters,
      filters,
      isUpdate,
      isDelete,
      isApprove,
      isDecline
    } = this.props;
    const { initialValue, actionType, selectedID, modal } = this.state;
    return (
      <GetAllUserByFilterComponent
        variables={variables}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, refetch }) => {
          return (
            <>
              <Crud<GetAllUserGetAllUser, InitialValue>
                isFilters={isFilters}
                isCreate={isCreate}
                filters={filters}
                me={me}
                toggleModal={this._toggleModal}
                isModalOpen={modal}
                pageTitle={pageTitle}
                items={data.getAllUserByFilter}
                fields={
                  fields && fields.length > 0
                    ? fields
                    : ["name", "area", "designation", "phone", "email", ""]
                }
                loading={loading}
                changeActionType={this._changeActionType}
                getActionType={this._getActionType}
                renderItem={item => {
                  return (
                    <UserTableRow
                      key={item.id}
                      isUpdate={isUpdate}
                      isDelete={isDelete}
                      isApprove={isApprove}
                      isDecline={isDecline}
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
                              roleID: this._getOptionalObjectID(role),
                              areaID: this._getOptionalObjectID(area)
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
                              roleID: this._getOptionalObjectID(role),
                              areaID: this._getOptionalObjectID(area)
                            }
                          }
                        });
                        refetch();
                      }}
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
                        await this._changeActionType("update");
                        this.setState(
                          {
                            selectedID: id,
                            initialValue: {
                              firstName,
                              lastName,
                              email,
                              password,
                              phone,
                              roleID: this._getOptionalObjectID(role),
                              areaID: this._getOptionalObjectID(area)
                            }
                          },
                          () => this._toggleModal()
                        );
                      }}
                      refetch={async (approved: boolean) => {
                        await approvedUser({
                          variables: {
                            userID: item.id,
                            approved
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
                  if (actionType === "create") {
                    await create({
                      variables: {
                        data: values
                      }
                    });
                  } else {
                    await updateBy({
                      variables: {
                        id: selectedID,
                        data: values
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
            </>
          );
        }}
      </GetAllUserByFilterComponent>
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
)(Users);
