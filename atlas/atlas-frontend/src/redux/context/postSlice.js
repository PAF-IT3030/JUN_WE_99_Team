import { createAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    clearPost: (state) => {
      state.posts = [];
    },
    postLoadingSuccess: (state, data) => {
      state.posts = data.payload;
    },
    postCreationSuccess: (state, data) => {
      state.posts = [...state.posts, data.payload];
    },
    addCommentSuccess: (state, data) => {
      const index = state.posts.findIndex(
        (post) => post.id === data.payload.postId
      );
      if (index >= 0) {
        const clonePosts = JSON.parse(JSON.stringify(state.posts));
        clonePosts[index].comments = [
          ...clonePosts[index].comments,
          data.payload,
        ];
        state.posts = [...clonePosts];
      }
    },
    deleteCommentSuccess: (state, data) => {
      const index = state.posts.findIndex(
        (post) => post.id === data.payload.postId
      );
      if (index >= 0) {
        const clonePosts = JSON.parse(JSON.stringify(state.posts));
        clonePosts[index].comments = clonePosts[index].comments.filter(
          (comment) => comment.id !== data.payload.commentId
        );
        state.posts = [...clonePosts];
      }
    },
    likePostSuccess: (state, data) => {
      const index = state.posts.findIndex(
        (post) => post.id === data.payload.postId
      );
      if (index >= 0) {
        const clonePosts = JSON.parse(JSON.stringify(state.posts));
        clonePosts[index].likes = [...clonePosts[index].likes, data.payload];
        state.posts = [...clonePosts];
      }
    },
    disLikePostSuccess: (state, data) => {
      const index = state.posts.findIndex(
        (post) => post.id === data.payload.postId
      );
      if (index >= 0) {
        const clonePosts = JSON.parse(JSON.stringify(state.posts));
        clonePosts[index].likes = clonePosts[index].likes.filter(
          (like) => like.id !== data.payload.likeId
        );
        state.posts = [...clonePosts];
      }
    },
    deleteSharePostSuccess: (state, data) => {
      const sharePosts = state.posts.filter((post) => post.id !== data.payload);
      state.posts = [...sharePosts];
    },
    EditSharePostSuccess: (state, data) => {
      const index = state.posts.findIndex(
        (post) => post.id === data.payload.id
      );
      if (index >= 0) {
        const clonePosts = JSON.parse(JSON.stringify(state.posts));
        clonePosts[index] = data.payload;
        state.posts = [...clonePosts];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAction("resetState"), initialState);
  },
});

export const {
  postLoadingSuccess,
  addCommentSuccess,
  deleteCommentSuccess,
  likePostSuccess,
  EditSharePostSuccess,
  disLikePostSuccess,
  deleteSharePostSuccess,
  postCreationSuccess,
  clearPost,
} = postSlice.actions;

export default postSlice.reducer;
