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
  onDelete?: () => void;
  onUpdate?: () => void;
  onApprove?: () => void;
  onDecline?: () => void;
}

export default class UserTableRow extends Component<
  UserTableRowProps,
  UserTableRowState
> {
  render() {
    const {
      item: { id, name, email, phone, role, area },
      onDelete,
      onUpdate,
      onApprove,
      onDecline
    } = this.props;
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
        />
      </tr>
    );
  }
}
