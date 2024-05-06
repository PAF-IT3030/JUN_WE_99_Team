import { put, takeLatest } from "redux-saga/effects";
import { API_BASE_URL } from "../../constants";
import { getUser, userLoadingError, userLoadingSuccess } from "./authSlice";
import request from "../../util/fetchUtil";

function* watchGetUser() {
  try {
    let data = yield request({
      url: API_BASE_URL + "/user/me",
      method: "GET",
    });
    console.warn("action is called", data);
    yield put(userLoadingSuccess(data));
  } catch (error) {
    put(userLoadingError(error));
  }
}

export function* authSaga() {
  yield takeLatest(getUser, watchGetUser);
}
