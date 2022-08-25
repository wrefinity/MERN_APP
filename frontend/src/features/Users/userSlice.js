import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axioss from "../Axioss";

const initialState = {
  status: "idle",
  users: [],
  error: null,
};
export const fetchUsers = createAsyncThunk("/users/get_user", async () => {
  try {
    const response = await Axioss.get("/users");
    return [...response?.data];
  } catch (er) {
    console.log(er.message);
  }
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload);
      },
      prepare(name, id) {
        return;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "suceeded";
        state.users = state.users.users.concat(laction.payload);
      })
      .addCase(fetchUser.failed, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addUser } = userSlice.actions;
export const getAllUser = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
export const selectPostByUserId = (state, userId) => state.users.find(user=> user._id === userId)
export default userSlice.reducer;
