import Noty from "noty";

export default class FlashMessage {
  private _text?: string;
  private _type?: Noty.Type = "error";

  private _instance: Noty;

  constructor(text: string = "", type?: Noty.Type) {
    this._text = text;
    this._type = type || "error";
    this._generate();
  }

  set text(text: string) {
    this._text = text;
  }

  set type(type: Noty.Type) {
    this._type = type || this._type;
  }

  private _generate(): void {
    this._instance = new Noty({
      type: this._type || "error",
      text: this._text,
      progressBar: true,
      theme: "metroui",
      timeout: 3000
    });
  }

  show(): void {
    this._generate();
    this._instance.show();
  }

  hide(): void {
    this._instance.close();
  }
}
