import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Axioss from "../Axioss";

const initialState = [];

export const fetchPosts = createAsyncThunk("/posts/get_post", async () => {
  try {
    const response = await Axioss.get("/posts");
    return [...response.data];
  } catch (er) {
    console.log(er.message);
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content) {
        return {
          payload: {
            title,
            content,
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              thumbsUp: 0,
              heart: 0,
            },
          },
        };
      },
    },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const postReact = state.posts.find((post) => post.id === postId);
      if (postReact) postReact.reactions[reaction]++;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "suceeded";
        const loadedPosts = action.payload.map((post) => {
          post.reactions = {
            like: 0,
            thumbsUp: 0,
            heart: 0,
          };
          return post
        });
        state.posts = state.posts.concat(loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action)=>{
        state.status = 'failed';
        state.error = action.error.message
      });
  },
});

export const { addPost, addReaction } = postSlice.actions;
export const selectAllPost = (state) => state.posts;
export const getPostsStatus = (state) => state.status;
export const getPostsError = (state) => state.error;
export default postSlice.reducer;
