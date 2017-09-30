import { inject, observer } from "mobx-react";
import * as React from "react";

@inject("store") @observer
export default class Report extends React.Component<any, undefined> {
  public render() {
    const store = this.props.store;
    return (
      <div>
          <h1>Example 1:</h1>
          <p>Error occurs under strict mode when updating the app version out of actions.</p>
          <p>App Version: { store.app.version }</p>
          <button onClick={ store.updateVersion }>Update Version</button>
      </div>
    );
  }
}
