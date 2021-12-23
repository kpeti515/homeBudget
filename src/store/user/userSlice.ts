/* eslint-disable no-param-reassign */
import { getAuth, signOut } from 'firebase/auth';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const logout = createAsyncThunk('user/logout', async () => {
  await signOut(getAuth());
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    login: {
      reducer(state, action) {
        state.currentUser = action.payload;
      },
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

export const selectCurrentUser = (state) => state.user.currentUser;
