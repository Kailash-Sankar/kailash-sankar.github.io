//import { call, put, takeLatest } from "redux-saga/effects";

// initialize  and check auth
function* helloSaga() {
  yield console.log("Hello there!");
  try {
    // init
  } catch (err) {
    console.log("exception:", err);
  }
}

export function* initSaga() {
  // load test
  yield helloSaga();
}
