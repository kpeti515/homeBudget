import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './budget/budgetSlice';
import userReducer from './user/userSlice';

export default configureStore({
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
