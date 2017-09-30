import { Provider } from "mobx-react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";
import store from "./store";
import { storex } from "./store+";

ReactDOM.render(
  <Provider storex={ storex } store={ store }>
    <App />
  </Provider>,
  document.getElementById("example"),
);
