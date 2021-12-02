/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { budgetDb } from '../../firebase/firebase';

export const fetchBudget = createAsyncThunk(
  'budgets/fetchBudgets',
  async (userId) => {
    const budgetCollection = collection(budgetDb, userId);
    const budgetSnapshot = await getDocs(budgetCollection);
    const budgetList = budgetSnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    return { budgetList, userId };
  }
);

export const addBudgetItem = createAsyncThunk(
  'budgets/addBudgetItem',
  async ({ userName, itemName, inputs }) => {
    await setDoc(doc(budgetDb, userName, itemName), inputs);
    return { userName, itemName, inputs };
  }
);

export const updateBudgetItem = createAsyncThunk(
  'budgets/updateBudgetItem',
  async ({ userName, itemName, inputs }) => {
    await setDoc(doc(budgetDb, userName, itemName), inputs);
    return { userName, itemName, inputs };
  }
);

export const deleteBudgetItem = createAsyncThunk(
  'budgets/deleteBudgetItem',
  async ({ userName, itemId }) => {
    await deleteDoc(doc(budgetDb, userName, itemId));
    return { userName, itemId };
  }
);

export const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    status: 'idle',
    accounts: {},
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBudget.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBudget.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts = {
          ...state.accounts,
          [action.payload.userId]: action.payload.budgetList,
        };
      })
      .addCase(fetchBudget.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBudgetItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBudgetItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts[action.payload.userName] = [
          ...state.accounts[action.payload.userName],
          { id: action.payload.itemName, ...action.payload.inputs },
        ];
      })
      .addCase(addBudgetItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateBudgetItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBudgetItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts[action.payload.userName] = state.accounts[
          action.payload.userName
        ].map((document) => {
          if (document.id === action.payload.itemName) {
            return { id: action.payload.itemName, ...action.payload.inputs };
          }
          return document;
        });
      })
      .addCase(updateBudgetItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBudgetItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBudgetItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accounts[action.payload.userName] = state.accounts[
          action.payload.userName
        ].filter((document) => document.id !== action.payload.itemId);
      })
      .addCase(deleteBudgetItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default budgetSlice.reducer;

export const selectBudgetAccount = (state) => state.budget.accounts;
