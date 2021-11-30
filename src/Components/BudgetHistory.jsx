import { useContext } from 'react';
import { BudgetItem } from './BudgetItem';

import FirebaseContext from '../firebase/FirebaseContext';

export const BudgetHistory = ({ showExpenses, showIncomes, sortBy }) => {
  const { userBudget } = useContext(FirebaseContext);

  return sortBy === 'date'
    ? userBudget
        .sort((a, b) => b.date.localeCompare(a.date))
        .map((budget) => (
          <BudgetItem
            key={budget.id}
            budget={budget}
            showExpenses={showExpenses}
            showIncomes={showIncomes}
          />
        ))
    : userBudget
        .sort((a, b) => {
          const amountA = a.expense || a.income;
          const amountB = b.expense || b.income;
          return amountB - amountA;
        })
        .map((budget) => (
          <BudgetItem
            key={budget.id}
            budget={budget}
            showExpenses={showExpenses}
            showIncomes={showIncomes}
          />
        ));
};
