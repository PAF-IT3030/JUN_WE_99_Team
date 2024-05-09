import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import postSlice from "./context/postSlice";
export default combineReducers({
  auth: authSlice,
  post: postSlice,
});
