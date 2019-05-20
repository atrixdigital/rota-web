import { Component } from "react";
import { GetAllUserGetAllUser } from "../generated/apolloComponent";
import {
  RotaTableItemsActions,
  RotaTableItemsSimple,
  RotaTableItemsTitle
} from "./RotaTable/RotaTableItems";

interface UserTableRowState {
  isActive: boolean;
}

interface UserTableRowProps {
  item: GetAllUserGetAllUser;
  onDelete: () => void;
  onUpdate: () => void;
  onApprove: () => void;
  onDecline: () => void;
  refetch: (approved: boolean) => void;
  isUpdate?: boolean;
  isDelete?: boolean;
  isApprove?: boolean;
  isDecline?: boolean;
}

export default class UserTableRow extends Component<
  UserTableRowProps,
  UserTableRowState
> {
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
      item: { id, name, email, phone, role, area },
      onDelete,
      onUpdate,
      onApprove,
      onDecline,
      isDelete,
      isUpdate,
      isApprove,
      isDecline
    } = this.props;
    const { isActive } = this.state;
    return (
      <tr key={id}>
        <RotaTableItemsTitle title={name} />
        <RotaTableItemsSimple text={area ? area.title : "N/A"} />
        <RotaTableItemsSimple text={role ? role.title : "N/A"} />
        <RotaTableItemsSimple text={phone} />
        <RotaTableItemsSimple text={email} />
        <RotaTableItemsActions
          onDelete={onDelete}
          onUpdate={onUpdate}
          onApprove={onApprove}
          onDecline={onDecline}
          isDelete={isDelete}
          isUpdate={isUpdate}
          isApprove={isApprove}
          isDecline={isDecline}
        />
      </tr>
    );
  }
}
