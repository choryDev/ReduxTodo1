import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { createStore } from "redux";
//리듀스스토어 만들기
import reducers from "./reducers";
//인덱스 파일을 불러오기 때문에 추가적으로 작성을 하지 않음

import { Provider } from "react-redux";

const store = createStore(reducers); //이렇게 스토어를 만듬

console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
