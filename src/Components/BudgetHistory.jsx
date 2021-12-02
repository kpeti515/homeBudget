import { useSelector } from 'react-redux';
import Proptypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@chakra-ui/react';
import { BudgetItem } from './BudgetItem';

import { selectBudgetAccount } from '../store/budget/budgetSlice';

export const BudgetHistory = ({ showExpenses, showIncomes, sortBy }) => {
  const userBudget = useSelector(selectBudgetAccount);

  const { account } = useParams();
  if (userBudget[account] !== undefined) {
    const copyUserBudget = [...userBudget[account]];
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
  return (
    <Stack>
      <Skeleton height="90px" />
      <Skeleton height="90px" />
      <Skeleton height="90px" />
    </Stack>
  );
};

BudgetHistory.propTypes = {
  showExpenses: Proptypes.bool.isRequired,
  showIncomes: Proptypes.bool.isRequired,
  sortBy: Proptypes.string.isRequired,
};
