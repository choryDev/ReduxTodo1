import * as types from "./ActionTypes";

export function blankon(blank) {
  return {
    type: types.BLANKON,
    blank
  };
}

export function blankoff(blank) {
  return {
    type: types.BLANKOFF,
    blank
  };
}

export function todoadd(data) {
  return {
    type: types.TODOADD,
    data
  };
}

export function tododelete(data) {
  return {
    type: types.TODODELETE,
    data
  };
}

export function todoupdate(data) {
  return {
    type: types.TODOUPDATE,
    data
  };
}
