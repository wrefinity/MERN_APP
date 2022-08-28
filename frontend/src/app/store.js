import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/Posts/postslice";

const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
export default store