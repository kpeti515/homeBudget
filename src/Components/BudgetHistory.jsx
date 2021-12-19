import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@chakra-ui/react';
import Proptypes from 'prop-types';
import { BudgetItem } from './BudgetItem';

import { selectBudgetAccount } from '../store/budget/budgetSlice';

export const BudgetHistory = React.memo(
  ({ showExpenses, showIncomes, sortBy }) => {
    const userBudget = useSelector(selectBudgetAccount);

    const { account } = useParams();
    if (userBudget[account]) {
      const currentBudget = [...userBudget[account]];
      return sortBy === 'date'
        ? currentBudget
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((budget) => (
              <BudgetItem
                key={budget.id}
                budget={budget}
                showExpenses={showExpenses}
                showIncomes={showIncomes}
              />
            ))
        : currentBudget
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
  }
);

BudgetHistory.propTypes = {
  showExpenses: Proptypes.bool.isRequired,
  showIncomes: Proptypes.bool.isRequired,
  sortBy: Proptypes.string.isRequired,
};
