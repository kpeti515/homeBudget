import { configureStore } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import counterReducer from './budget/budgetSlice';
import userReducer from './user/userSlice';

const store = configureStore({
  reducer: {
    budget: counterReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['user/login'],
        ignoredPaths: ['user.currentUser'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector = createSelectorHook<RootState>();

export default store;
