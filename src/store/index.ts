import { autorun, computed, observable } from "mobx";

class Store {
  @observable public app: any;

  constructor() {
    this.app = { version: 1 };
    this.updateVersion = this.updateVersion.bind(this);

    autorun(() => {
      console.log("report", this.report);
    });
  }

  @computed get report() {
    return "The version of App is " + this.app.version;
  }

  public updateVersion() {
    this.app.version = this.app.version + 1;
  }
}

export default new Store();
