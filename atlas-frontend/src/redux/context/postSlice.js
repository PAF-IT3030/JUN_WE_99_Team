import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  sharedPosts: [],
  refreshPost: false,
  isPostLoading: false,
  isCommentPending: false,
  addCommentError: null,
  isEditCommentPending: false,
  editCommentError: null,
  isDeleteCommentPending: false,
  isLikePost: false,
  likePostError: null,
  isDislikePost: false,
  disLikePOstError: null,
  deleteCommentError: null,
  postLoadingError: null,
  isSharePost: false,
  sharePostError: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPost: (state, data) => {
      state.isPostLoading = true;
    },
    postLoadingSuccess: (state, data) => {
      state.isPostLoading = false;
      state.post = data.payload;
    },
    postLoadingError: (state, data) => {
      state.isPostLoading = false;
      state.postLoadingError = data.payload;
    },
    addComment: (state, data) => {
      state.isCommentPending = true;
    },
    addCommentSuccess: (state, data) => {
      const comments = [...state.post.comments, data.payload];
      state.post = { ...state.post, comments };
      state.isCommentPending = false;
    },
    addCommentError: (state, data) => {
      state.isCommentPending = false;
      state.addCommentError = data;
    },
    editComment: (state, data) => {
      state.isEditCommentPending = true;
    },
    editCommentSuccess: (state) => {
      state.isEditCommentPending = false;
    },
    editCommentError: (state, data) => {
      state.isEditCommentPending = false;
      state.editCommentError = data;
    },
    deleteComment: (state, data) => {
      state.isDeleteCommentPending = true;
    },
    deleteCommentSuccess: (state, data) => {
      const comments = state.post.comments.filter(
        (comment) => comment.id !== data.payload
      );
      state.post = { ...state.post, comments };
      state.isDeleteCommentPending = false;
    },
    deleteCommentError: (state, data) => {
      state.deleteCommentError = data;
      state.isDeleteCommentPending = false;
    },
    likePost: (state, data) => {
      state.likePost = true;
    },
    likePostSuccess: (state, data) => {
      const likes = [...state.post.likes, data.payload];
      state.post = { ...state.post, likes };
      state.likePost = false;
    },
    likePostError: (state, data) => {
      state.likePostError = data;
      state.likePost = false;
    },
    disLikePost: (state, data) => {
      state.isDislikePost = true;
    },
    disLikePostSuccess: (state, data) => {
      const likes = state.post.likes.filter((like) => like.id !== data.payload);
      state.post = { ...state.post, likes };
      state.isDislikePost = false;
    },
    disLikePostError: (state, data) => {
      state.disLikePOstError = data;
      state.isDislikePost = false;
    },
    sharePost: (state, data) => {
      state.isSharePost = true;
    },
    sharePostSuccess: (state, data) => {
      state.isSharePost = false;
    },
    sharePostError: (state, data) => {
      state.sharePostError = data;
      state.isSharePost = false;
    },
    deleteSharePost: (state, data) => {
      state.isDeleteSharePost = true;
    },
    deleteSharePostSuccess: (state, data) => {
      const sharePosts = state.sharedPosts.filter(
        (post) => post.id !== data.payload
      );
      state.sharedPosts = [...sharePosts];
      state.isDeleteSharePost = false;
    },
    deleteSharePostError: (state, data) => {
      state.deleteSharePostError = data;
      state.isDeleteSharePost = false;
    },
    editSharePost: (state, data) => {
      state.isEditSharePost = true;
    },
    editSharePostSuccess: (state, data) => {
      state.isEditSharePost = false;
    },
    editSharePostError: (state, data) => {
      state.editShareError = data;
      state.isEditSharePost = false;
    },
    getSharedPost: (state, data) => {
      state.isSharedPost = true;
    },
    getSharedPostSuccess: (state, data) => {
      state.sharedPosts = data.payload;
      state.isSharedPost = false;
    },
    getSharedPostError: (state, data) => {
      state.getSharedPostError = data;
      state.isSharedPost = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAction("resetState"), initialState);
  },
});

export const {
  getSharedPost,
  getSharedPostSuccess,
  getSharedPostError,
  deleteSharePost,
  deleteSharePostSuccess,
  deleteSharePostError,
  editSharePost,
  editSharePostSuccess,
  editSharePostError,
  sharePost,
  sharePostError,
  sharePostSuccess,
  likePost,
  likePostSuccess,
  likePostError,
  disLikePost,
  disLikePostError,
  disLikePostSuccess,
  getPost,
  postLoadingSuccess,
  postLoadingError,
  addComment,
  addCommentError,
  addCommentSuccess,
  editComment,
  editCommentError,
  editCommentSuccess,
  deleteComment,
  deleteCommentError,
  deleteCommentSuccess,
} = postSlice.actions;

export default postSlice.reducer;
