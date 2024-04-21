import { put, takeLatest } from "redux-saga/effects";
import { API_BASE_URL } from "../../constants";
import request from "../../util/fetchUtil";
import {
  addComment,
  addCommentError,
  addCommentSuccess,
  deleteComment,
  deleteCommentError,
  deleteCommentSuccess,
  deleteSharePost,
  deleteSharePostError,
  deleteSharePostSuccess,
  disLikePost,
  disLikePostError,
  disLikePostSuccess,
  editComment,
  editCommentError,
  editCommentSuccess,
  editSharePost,
  editSharePostError,
  editSharePostSuccess,
  getPost,
  getSharedPost,
  getSharedPostError,
  getSharedPostSuccess,
  likePost,
  likePostError,
  likePostSuccess,
  postLoadingError,
  postLoadingSuccess,
  sharePost,
  sharePostError,
  sharePostSuccess,
} from "./postSlice";
import { toast } from "react-toastify";

function* watchGetPost({ payload }) {
  try {
    let data = yield request({
      url: API_BASE_URL + "/api/v1/posts/" + payload,
      method: "GET",
    });
    yield put(postLoadingSuccess(data));
  } catch (error) {
    put(postLoadingError(error));
  }
}

function* watchAddComment({ payload }) {
  try {
    let data = yield request({
      url: API_BASE_URL + "/api/comments/",
      method: "POST",
      body: JSON.stringify(payload),
    });

    toast("Comment Created Successfully", { type: "success" });
    yield put(addCommentSuccess(data));
  } catch (error) {
    put(addCommentError(error));
  }
}

function* watchDeleteComment({ payload }) {
  try {
    yield request({
      url:
        API_BASE_URL +
        "/api/comments/" +
        payload.commentId +
        "/" +
        payload.userId,
      method: "DELETE",
    });
    toast("Comment Deleted Successfully", { type: "success" });
    yield put(deleteCommentSuccess(payload.commentId));
  } catch (error) {
    put(deleteCommentError(error));
  }
}

function* watchEditComment({ payload }) {
  try {
    let data = yield request({
      url: API_BASE_URL + "/api/comments/" + payload.id,
      method: "PUT",
      body: JSON.stringify(payload),
    });
    toast("Comment Edited Successfully", { type: "success" });
    yield put(editCommentSuccess(data));
  } catch (error) {
    put(editCommentError(error));
  }
}

function* watchLikePost({ payload }) {
  try {
    let data = yield request({
      url: API_BASE_URL + "/posts/" + payload.postId + "/likes",
      method: "POST",
      body: JSON.stringify({ postId: payload.postId, userId: payload.userId }),
    });
    yield put(likePostSuccess(data));
  } catch (error) {
    put(likePostError(error));
  }
}

function* watchDisLikePost({ payload }) {
  try {
    yield request({
      url: API_BASE_URL + "/posts/likes/" + payload.likeId,
      method: "DELETE",
    });
    yield put(disLikePostSuccess(payload.likeId));
  } catch (error) {
    put(disLikePostError(error));
  }
}

function* watchSharePost({ payload }) {
  try {
    yield request({
      url: API_BASE_URL + "/api/v1/shared-posts",
      method: "POST",
      body: JSON.stringify(payload),
    });
    toast("Post shared Successfully", { type: "success" });
    yield put(sharePostSuccess(payload));
  } catch (error) {
    put(sharePostError(error));
  }
}

function* watchGetSharedPost() {
  try {
    const data = yield request({
      url: API_BASE_URL + "/api/v1/shared-posts",
      method: "GET",
    });
    yield put(getSharedPostSuccess(data));
  } catch (error) {
    put(getSharedPostError(error));
  }
}

function* watchDeleteSharePost({ payload }) {
  try {
    yield request({
      url: API_BASE_URL + "/api/v1/shared-posts/" + payload,
      method: "DELETE",
    });
    yield put(deleteSharePostSuccess(payload));
  } catch (error) {
    put(deleteSharePostError(error));
  }
}

function* watchEditSharePost({ payload }) {
  try {
    yield request({
      url: API_BASE_URL + "/api/v1/shared-posts/" + payload.id,
      method: "PUT",
      body: JSON.stringify(payload),
    });
    toast("Post edited Successfully", { type: "success" });
    yield put(editSharePostSuccess(payload));
  } catch (error) {
    put(editSharePostError(error));
  }
}

export function* postSaga() {
  yield takeLatest(getSharedPost, watchGetSharedPost);
  yield takeLatest(editSharePost, watchEditSharePost);
  yield takeLatest(deleteSharePost, watchDeleteSharePost);
  yield takeLatest(sharePost, watchSharePost);
  yield takeLatest(getPost, watchGetPost);
  yield takeLatest(likePost, watchLikePost);
  yield takeLatest(disLikePost, watchDisLikePost);
  yield takeLatest(editComment, watchEditComment);
  yield takeLatest(deleteComment, watchDeleteComment);
  yield takeLatest(addComment, watchAddComment);
}
