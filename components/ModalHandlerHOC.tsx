import { Component } from "react";

interface ChildrenProps<I> {
  toggleModal: () => void;
  modal: boolean;
  changeActionType: (type?: string) => Promise<void>;
  getActionType: () => string;
  getOptionalObjectID: (obj: any) => any;
  initialValue: I;
  updateInitialValue: (
    selectedID: string,
    initialValue: I,
    cb: () => void
  ) => void;
  getSelectedValue: () => string;
}

interface Props<I> {
  children: (methods: ChildrenProps<I>) => JSX.Element;
  initialValue: I;
}

interface State<I> {
  modal: boolean;
  actionType: string;
  initialValue: I;
  selectedID: string;
}

class ModalHandlerHOC<I> extends Component<Props<I>, State<I>> {
  state: Readonly<State<I>> = {
    modal: false,
    actionType: "create",
    initialValue: this.props.initialValue,
    selectedID: ""
  };

  _toggleModal = () => {
    this.setState(({ modal }) => ({
      modal: !modal
    }));
  };

  _changeActionType = async (type: string = "create") => {
    this.setState({ actionType: type }, () => Promise.resolve());
  };

  _getActionType = (): string => this.state.actionType;

  _getOptionalObjectID = (obj: any) => (obj && obj.id ? obj.id : "");

  _updateInitialValue = (
    selectedID: string,
    initialValue: I,
    cb: () => void
  ) => {
    this.setState(
      {
        selectedID,
        initialValue: initialValue
      },
      cb
    );
  };

  _getSelectedValue = (): string => this.state.selectedID;

  render() {
    const { modal, initialValue } = this.state;
    return this.props.children({
      toggleModal: this._toggleModal,
      modal,
      changeActionType: this._changeActionType,
      getActionType: this._getActionType,
      getOptionalObjectID: this._getOptionalObjectID,
      initialValue,
      updateInitialValue: this._updateInitialValue,
      getSelectedValue: this._getSelectedValue
    });
  }
}

export default ModalHandlerHOC;
