import React from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@chakra-ui/react';
import { BudgetItem } from './BudgetItem';

import { selectBudgetAccount } from '../store/budget/budgetSlice';
import { BudgetHistoryProps } from '../helpers/interfaces';
import { useTypedSelector } from '../store/store';

const BudgetHistory: React.FC<BudgetHistoryProps> = (props) => {
  const { showExpenses, showIncomes, sortBy } = props;
  const userBudget = useTypedSelector(selectBudgetAccount);

  const { account } = useParams<{ account: string }>();
  if (userBudget[account]) {
    const currentBudget = [...userBudget[account]];
    return (
      <>
        {sortBy === 'date'
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
                const amountA = 'expense' in a ? a.expense : a.income;
                const amountB = 'expense' in b ? b.expense : b.income;

                return Number(amountB) - Number(amountA);
              })
              .map((budget) => (
                <BudgetItem
                  key={budget.id}
                  budget={budget}
                  showExpenses={showExpenses}
                  showIncomes={showIncomes}
                />
              ))}
      </>
    );
  }
  return (
    <Stack>
      <Skeleton height="90px" />
      <Skeleton height="90px" />
      <Skeleton height="90px" />
    </Stack>
  );
};

export default React.memo<BudgetHistoryProps>(BudgetHistory);
