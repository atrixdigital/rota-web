import { Component } from "react";
import { compose } from "react-apollo";
import Crud from "../components/Crud";
import { SelectField, TextField } from "../components/FormFields";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  CreateDepartmentHOC,
  CreateDepartmentMutationFn,
  DeleteByDepartmentIdHOC,
  DeleteByDepartmentIdMutationFn,
  GetAllDepartmentComponent,
  GetAllDepartmentGetAllDepartment,
  GetAllUserByRoleHOC,
  GetAllUserByRoleQuery,
  UpdateByDepartmentIdHOC,
  UpdateByDepartmentIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { withAuth } from "../lib/withAuth";
import { validateDepartmentSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByDepartmentIdMutationFn,
    UpdateByDepartmentIdMutationFn,
    CreateDepartmentMutationFn
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
  title: string;
  email: string;
  phone: string;
  userID: string;
}

class Departments extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    actionType: "create",
    initialValue: {
      title: "",
      email: "",
      phone: "",
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
      <GetAllDepartmentComponent fetchPolicy="cache-and-network">
        {({ data, loading, refetch }) => {
          return (
            <>
              <Crud<GetAllDepartmentGetAllDepartment, InitialValue>
                me={me}
                filters={["filter"]}
                toggleModal={this._toggleModal}
                isModalOpen={modal}
                pageTitle="Departments"
                items={data.getAllDepartment}
                fields={["title", "email", "phone", "Staff", ""]}
                loading={loading}
                changeActionType={this._changeActionType}
                getActionType={this._getActionType}
                renderItem={({ id, title, email, phone, user }) => {
                  return (
                    <tr key={id}>
                      <RotaTableItemsTitle title={title} />
                      <RotaTableItemsSimple text={email} />
                      <RotaTableItemsSimple text={phone} />
                      <RotaTableItemsSimple
                        text={user ? user.name : "No Staff"}
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
                                title,
                                email,
                                phone,
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
                validationSchema={validateDepartmentSchema}
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
                        label="Title"
                        name="title"
                        placeholder="Title"
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
      </GetAllDepartmentComponent>
    );
  }
}

export default compose(
  GetAllUserByRoleHOC({ name: "getAllUserByRole" }),
  DeleteByDepartmentIdHOC({ name: "deleteBy" }),
  UpdateByDepartmentIdHOC({ name: "updateBy" }),
  CreateDepartmentHOC({ name: "create" })
)(withAuth(Departments));
