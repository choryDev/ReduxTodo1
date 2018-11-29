//리듀서를 합치기 위한 코드
import { combineReducers } from "redux";
import checkblank from "./checkblank";
import todomanage from "./todomanage";

const reducers = combineReducers({
  checkblank,
  todomanage
});

export default reducers;
