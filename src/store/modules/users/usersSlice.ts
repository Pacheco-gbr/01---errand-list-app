import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { RootState } from "../..";
import { apiGet, apiPost } from "../../../services/ApiService";
import { User, CreateNewUser } from "../typeStore";

//const initialState: Users = [];

const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.id,
});

export const { selectAll: findingAllUsers, selectById: gettingUserById } =
  usersAdapter.getSelectors<RootState>((state) => state.users);

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const response = await apiGet("/users");
  return response;
});

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string) => {
    const response = await apiGet(`/users/${id}`);
    return response;
  }
);

export const postUser = createAsyncThunk(
  "users/postUser",
  async (user: CreateNewUser) => {
    const response = await apiPost("/users", user);
    return response;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    success: false,
    message: "",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      if (action.payload.success) {
        usersAdapter.setAll(state, action.payload.data);
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
    builder.addCase(postUser.fulfilled, (state, action) => {
      if (action.payload.success) {
        usersAdapter.addOne(state, action.payload.data);
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      if (action.payload.success) {
        usersAdapter.setOne(state, action.payload.data);
      }
      state.message = action.payload.message;
      state.success = action.payload.success;
    });
  },
});

export const usersReducer = usersSlice.reducer;
