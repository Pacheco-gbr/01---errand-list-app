import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./modules/rootReducer";

const myStore = configureStore({
  reducer: rootReducer,
});

export { myStore };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof myStore.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof myStore.dispatch;
