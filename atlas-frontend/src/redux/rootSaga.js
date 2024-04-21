import { all } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";
import { postSaga } from "./context/postSaga";

function* rootSaga() {
  yield all([authSaga(), postSaga()]);
}

export default rootSaga;
