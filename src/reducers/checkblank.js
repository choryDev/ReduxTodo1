import * as types from "../actions/ActionTypes";

//초기상태 객체 생성
const initialState = {
  blank: false
};

/* */
export default function checkblank(state = initialState, action) {
  /* 갯수 많으면 스위치문이 하기 편함*/
  switch (action.type) {
    case types.BLANKON:
      //값을 바꾼게 아니고 새로운 객체를 만듬
      //스프레드 오퍼 이용 이렇게 하면 이전에 스테이트가 다 복사됨
      return {
        blank: true
        //배열을 전부 가져와서 기존값은 그대로이고 u만 덮어씌움
      };
    case types.BLANKOFF:
      return {
        blank: false
      };
    //액션케이스가 주어지지 않으면 디폴트값 전달
    default:
      return state;
  }
}
