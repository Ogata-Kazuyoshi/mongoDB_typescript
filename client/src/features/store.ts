import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Slice/CounterSlice';
import userReducer from './Slice/UserSlice';
import selectVehicleReducer from './Slice/SelectVehicleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userAuth: userReducer,
    selectVehicle: selectVehicleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
