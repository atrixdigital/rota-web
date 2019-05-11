import { Component } from "react";
import { compose } from "react-apollo";
import Crud from "../components/Crud";
import { TextField } from "../components/FormFields";
import {
  RotaTableItemsActions,
  RotaTableItemsTitle
} from "../components/RotaTable/RotaTableItems";
import {
  CreateRoleHOC,
  CreateRoleMutationFn,
  DeleteByRoleIdHOC,
  DeleteByRoleIdMutationFn,
  GetAllRoleGetAllRole,
  GetAllRoleNoAuthComponent,
  UpdateByRoleIdHOC,
  UpdateByRoleIdMutationFn
} from "../generated/apolloComponent";
import { CrudProps } from "../interfaces";
import { withAuth } from "../lib/withAuth";
import { validateRegisterSchema } from "../shared/validation-schema";

interface Props
  extends CrudProps<
    DeleteByRoleIdMutationFn,
    UpdateByRoleIdMutationFn,
    CreateRoleMutationFn
  > {}

interface State {
  modal: boolean;
  actionType: string;
  initialValue: InitialValue;
  selectedID: string;
}

interface InitialValue {
  title: string;
}

class Roles extends Component<Props, State> {
  state: Readonly<State> = {
    modal: false,
    actionType: "create",
    initialValue: {
      title: ""
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
    const { create, updateBy, deleteBy, me } = this.props;
    const { initialValue, actionType, selectedID, modal } = this.state;
    return (
      <GetAllRoleNoAuthComponent fetchPolicy="cache-and-network">
        {({ data, loading, refetch }) => {
          return (
            <>
              <Crud<GetAllRoleGetAllRole, InitialValue>
                filters={["filter"]}
                me={me}
                toggleModal={this._toggleModal}
                isModalOpen={modal}
                pageTitle="Roles"
                items={data.getAllRoleNoAuth}
                fields={["title", ""]}
                loading={loading}
                changeActionType={this._changeActionType}
                getActionType={this._getActionType}
                renderItem={({ id, title }) => {
                  return (
                    <tr key={id}>
                      <RotaTableItemsTitle title={title} />
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
                                title
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
                        label="Title"
                        name="title"
                        placeholder="title"
                        componentType="text"
                      />
                    </>
                  );
                }}
              />
            </>
          );
        }}
      </GetAllRoleNoAuthComponent>
    );
  }
}

export default compose(
  DeleteByRoleIdHOC({ name: "deleteBy" }),
  UpdateByRoleIdHOC({ name: "updateBy" }),
  CreateRoleHOC({ name: "create" })
)(withAuth(Roles));
