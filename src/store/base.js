import update from "immutability-helper";
import { applyScope } from "./utils";
import { connect } from "react-redux";

const initialState = {
  msg: "hello world",
};

const scope = "base";

export const types = applyScope(scope, ["SET_MSG"]);

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MSG:
      return update(state, {
        msg: { $set: action.msg },
      });
  }
  return state;
};

// dispatch actions
const mapDispatchToProps = (dispatch) => ({
  setMsg: (msg) =>
    dispatch({
      type: types.SET_MSG,
      msg,
    }),
});

// common store connector
const mapStateToProps = (state) => state.base;

// connect
export const connecter = (page) =>
  connect(mapStateToProps, mapDispatchToProps)(page);

export default commonReducer;
