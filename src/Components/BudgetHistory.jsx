import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BudgetItem } from './BudgetItem';

import { selectBudgetAccount } from '../store/budget/budgetSlice';

export const BudgetHistory = ({ showExpenses, showIncomes, sortBy }) => {
  const userBudget = useSelector(selectBudgetAccount);

  const { id } = useParams();
  if (userBudget[id] !== undefined) {
    const copyUserBudget = [...userBudget[id]];
    return sortBy === 'date'
      ? copyUserBudget
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((budget) => (
            <BudgetItem
              key={budget.id}
              budget={budget}
              showExpenses={showExpenses}
              showIncomes={showIncomes}
            />
          ))
      : copyUserBudget
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
  }
  return null;
};
