import { Component } from "react";
import { compose } from "react-apollo";
import Toggle from "react-toggle";
import Crud from "../components/Crud";
import {
  PasswordField,
  SelectField,
  TextField
} from "../components/FormFields";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  ApprovedUserHOC,
  ApprovedUserMutationFn,
  CreateUserHOC,
  CreateUserMutationFn,
  DeleteByUserIdHOC,
  DeleteByUserIdMutationFn,
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
  approvedUser: ApprovedUserMutationFn;
  variables?: GetAllUserByFilterVariables;
  pageTitle: string;
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
  appproved?: string;
  roleID: string;
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
      roleID: ""
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
      create,
      updateBy,
      deleteBy,
      approvedUser,
      me,
      variables,
      pageTitle
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
                filters={["filter"]}
                me={me}
                toggleModal={this._toggleModal}
                isModalOpen={modal}
                pageTitle={pageTitle}
                items={data.getAllUserByFilter}
                fields={["name", "email", "role", "status", ""]}
                loading={loading}
                changeActionType={this._changeActionType}
                getActionType={this._getActionType}
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
                          role
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
                              roleID: this._getOptionalObjectID(role)
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
                            ? getAllRoleNoAuth.map(({ id, title }) => ({
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
  DeleteByUserIdHOC({ name: "deleteBy" }),
  UpdateByUserIdHOC({ name: "updateBy" }),
  CreateUserHOC({ name: "create" }),
  ApprovedUserHOC({ name: "approvedUser" })
)(Users);

interface UserTableRowState {
  isActive: boolean;
}

interface UserTableRowProps {
  item: GetAllUserGetAllUser;
  onDelete: () => void;
  onUpdate: () => void;
  refetch: (approved: boolean) => void;
}

class UserTableRow extends Component<UserTableRowProps, UserTableRowState> {
  state: Readonly<UserTableRowState> = {
    isActive: this.props.item.appproved
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.item.appproved
    });
  }

  _handleSwitchChange = (__: React.ChangeEvent<HTMLInputElement>): void => {
    const { refetch } = this.props;
    this.setState({ isActive: !this.state.isActive }, () =>
      refetch(this.state.isActive)
    );
  };

  render() {
    const {
      item: { id, name, email, role },
      onDelete,
      onUpdate
    } = this.props;
    const { isActive } = this.state;
    return (
      <tr key={id}>
        <RotaTableItemsTitle title={name} />
        <RotaTableItemsSimple text={email} />
        <RotaTableItemsSimple text={role ? role.title : "No Role"} />
        <td>
          <Toggle
            defaultChecked={isActive}
            onChange={this._handleSwitchChange}
          />
        </td>
        <RotaTableItemsActions onDelete={onDelete} onUpdate={onUpdate} />
      </tr>
    );
  }
}
