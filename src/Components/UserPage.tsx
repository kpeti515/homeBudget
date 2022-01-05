import { SetStateAction, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  Heading,
  Box,
  Text,
  Select,
  Switch,
  Flex,
  FormLabel,
  Spinner,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { fetchBudget, selectBudgetAccount } from '../store/budget/budgetSlice';

import { ExpenseModal } from './ExpenseModal';
import { IncomeModal } from './IncomeModal';
import BudgetHistory from './BudgetHistory';
import { useTypedSelector } from '../store/store';

export const UserPage = () => {
  const { account } = useParams<{ account: string }>();

  const dispatch = useDispatch();
  const budget = useTypedSelector(selectBudgetAccount);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!budget[account]) {
        setIsLoading(true);
        await dispatch(await fetchBudget(account));
        setIsLoading(false);
      }
    })();
  }, [dispatch, account, budget]);

  const [showExpenses, changeShowExpenses] = useState(true);
  const [showIncomes, changeShowIncomes] = useState(true);

  const [expenseModalIsOpen, setExpenseModalIsOpen] = useState(false);
  function openExpenseModal() {
    setExpenseModalIsOpen(true);
  }
  function closeExpenseModal() {
    setExpenseModalIsOpen(false);
  }
  const [incomeModalIsOpen, setIncomeModalIsOpen] = useState(false);
  function openIncomeModal() {
    setIncomeModalIsOpen(true);
  }
  function closeIncomeModal() {
    setIncomeModalIsOpen(false);
  }

  const [sortType, setSortType] = useState<'date' | 'amount'>('date');

  const expenses = budget[account]
    ?.map((budgetItem) => {
      if ('expense' in budgetItem && budgetItem.isIncomeForCloth === false) {
        return parseInt(budgetItem.expense, 10);
      }
      return 0;
    })
    .reduce((sum: number, value: number) => sum + value, 0);

  const incomes = budget[account]
    ?.map((budgetItem) => {
      if ('income' in budgetItem && budgetItem.isIncomeForCloth === false) {
        return parseInt(budgetItem.income, 10);
      }
      return 0;
    })
    .reduce((sum: number, value: number) => sum + value, 0);

  const expenseForCloth = budget[account]
    ?.map((budgetItem) => {
      if ('expense' in budgetItem && budgetItem.isIncomeForCloth === true) {
        return parseInt(budgetItem.expense, 10);
      }
      return 0;
    })
    .reduce((sum: number, value: number) => sum + value, 0);

  const incomeForCloth = budget[account]
    ?.map((budgetItem) => {
      if ('income' in budgetItem && budgetItem.isIncomeForCloth === true) {
        return parseInt(budgetItem.income, 10);
      }
      return 0;
    })
    .reduce((sum: number, value: number) => sum + value, 0);
  return (
    <>
      <Heading as="h2" size="lg" m={2}>
        {account} pénztárcája:
        {isLoading ? (
          <Spinner size="md" />
        ) : (
          `${(incomes - expenses).toLocaleString('hu')} Ft`
        )}
      </Heading>
      {account === 'Lóri' ? (
        <h4>
          {account} ruhapénze:&nbsp;
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            `${(incomeForCloth - expenseForCloth).toLocaleString('hu')} HUF`
          )}
        </h4>
      ) : null}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          onClick={openIncomeModal}
          m={2}
          height="3rem"
          width="34%"
        >
          Bevétel
        </Button>
        <Button
          leftIcon={<MinusIcon />}
          colorScheme="red"
          onClick={openExpenseModal}
          m={2}
          height="3rem"
          width="34%"
        >
          Kiadás
        </Button>
      </Box>
      <Box display="flex">
        <Text m={2}>Számlatörténet:</Text>
        <Select
          onChange={(e) =>
            setSortType(e.target.value as SetStateAction<'date' | 'amount'>)
          }
        >
          <option value="date">Dátum alapján</option>
          <option value="amount">Összeg alapján</option>
        </Select>
      </Box>
      <Flex m={4} justify="center" align="center">
        <FormLabel htmlFor="Incomes">Bevételek</FormLabel>
        <Switch
          id="Incomes"
          size="lg"
          colorScheme="blue"
          defaultIsChecked
          onChange={() => changeShowIncomes(!showIncomes)}
        />

        <FormLabel ml={10} htmlFor="Expenses">
          Kiadások
        </FormLabel>
        <Switch
          id="Expenses"
          size="lg"
          colorScheme="blue"
          defaultIsChecked
          onChange={() => changeShowExpenses(!showExpenses)}
        />
      </Flex>

      <BudgetHistory
        showExpenses={showExpenses}
        showIncomes={showIncomes}
        sortBy={sortType}
      />

      <ExpenseModal
        user={account}
        isOpen={expenseModalIsOpen}
        onRequestClose={closeExpenseModal}
      />
      <IncomeModal
        user={account}
        isOpen={incomeModalIsOpen}
        onRequestClose={closeIncomeModal}
      />
    </>
  );
};
