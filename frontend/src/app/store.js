import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/Posts/postslice";

export default store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
