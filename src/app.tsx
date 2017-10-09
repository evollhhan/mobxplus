import { inject, observer } from "mobx-react";
import * as React from "react";
import { IUserDispatch } from "./store/refer";

interface IStore {
  store?: any;
}

@inject("store") @observer
export default class App extends React.Component<IStore, undefined> {
  constructor() {
    super();
    this.hanlder = this.hanlder.bind(this);
  }

  public hanlder() {
    const store = this.props.store;
    const dispatch: IUserDispatch = this.props.store.dispatch;
    dispatch.LOAD_USERINFO();
  }

  public render() {
    const state = this.props.store.state;
    return (
      <div className="container">
        <p>See log in the console</p>
        <h1>Userinfo</h1>
        <div>
          <p>Name: { state.name }</p>
          <p>Age: { state.age }</p>
          <p>School Location: { state.school.location }</p>
        </div>
        <button onClick={ this.hanlder }>Change Userinfo</button>
      </div>
    );
  }
}
