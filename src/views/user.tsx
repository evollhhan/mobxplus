import { inject, observer } from "mobx-react";
import * as React from "react";

interface IStore {
  storex?: any;
}

@inject("storex") @observer
export default class User extends React.Component<IStore, undefined> {
  constructor() {
    super();
    this.hanlder = this.hanlder.bind(this);
  }

  public hanlder() {
    const storex = this.props.storex;
    storex.dispatch("LOAD_USERINFO");
  }

  public render() {
    const state = this.props.storex.state;
    return (
      <div className="User">
        <h1>User</h1>
        <div>
          <p>Name: { state.name }</p>
          <p>Age: { state.age }</p>
          <p>School Location: { state.school.location }</p>
        </div>
        <button onClick={ this.hanlder }>LOAD USER INFO</button>
      </div>
    );
  }
}