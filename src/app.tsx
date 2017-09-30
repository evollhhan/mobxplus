import * as React from "react";
import { Report, User } from "./views";

export class App extends React.Component<any, undefined> {
  public render() {
    return (
      <div>
          <Report />
          <User />
      </div>
    );
  }
}
