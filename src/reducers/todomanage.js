import * as types from "../actions/ActionTypes";
import { Map, List } from "immutable";

const initialState = Map({
  todoData: List([Map({})])
});
export default function todomanage(state = initialState, action) {
  const todoData = state.get("todoData");
  /* 갯수 많으면 스위치문이 하기 편함*/
  switch (action.type) {
    case types.TODOADD:
      return state.set(
        "todoData",
        todoData.push(
          Map({
            data: action.data
          })
        )
      );
    case types.TODODELETE:
      return state.set("todoData", list.delete(1));

    case types.TODOUPDATE:
      return {
        ...state,
        number: state.number - 1
      };
    default:
      return state;
  }
}
