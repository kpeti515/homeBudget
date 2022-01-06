import { getAuth, signOut } from 'firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../helpers/interfaces';
import { RootState } from '../store';

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(getAuth());
});

const initialState = {
  currentUser: null,
  status: 'idle',
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.currentUser = null;
      });
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
