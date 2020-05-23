import update from "immutability-helper";
import { applyScope } from "./utils";
import { connect } from "react-redux";

const initialState = {
  data: [],
  loading: true,
  error: false,
};

const scope = "projects";

export const types = applyScope(scope, ["INIT", "SET_SUCCESS", "SET_ERROR"]);

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT:
      return update(state, {
        loading: { $set: true },
        error: { $set: false },
      });
    case types.SET_SUCCESS:
      return update(state, {
        data: { $set: action.data },
        loading: { $set: false },
        error: { $set: false },
      });
    case types.SET_ERROR:
      return update(state, {
        loading: { $set: false },
        error: { $set: true },
      });
  }
  return state;
};

// dispatch actions
const mapDispatchToProps = (dispatch) => ({
  init: () =>
    dispatch({
      type: types.INIT,
    }),
  setSuccess: (data) =>
    dispatch({
      type: types.SET_SUCCESS,
      data,
    }),
  SET_ERROR: () =>
    dispatch({
      type: types.SET_ERROR,
    }),
});

// common store connector
const mapStateToProps = (state) => state[scope];

// connect
export const connecter = (page) =>
  connect(mapStateToProps, mapDispatchToProps)(page);

export default projectReducer;
