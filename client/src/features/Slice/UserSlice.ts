import { PayloadAction, createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store';

export interface userState {
  isAuth: boolean;
  username: string;
}

const initialState: userState = {
  isAuth: false,
  username: '',
};

export const userSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    passIsAuth: (state) => {
      state.isAuth = true;
    },
    failIsAuth: (state) => {
      state.isAuth = false;
    },
    setUsernameGlobal: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { passIsAuth, failIsAuth, setUsernameGlobal } = userSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
