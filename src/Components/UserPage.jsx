/* eslint-disable block-scoped-var */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import numeral from 'numeral';
import {
  Button, Heading, Box, Text, Select, Switch, Flex, FormLabel,
} from '@chakra-ui/core';
import budgetReducer from '../Reducers/budgetReducer';

import ExpenseModal from './Expense_modal';
import IncomeModal from './Income_modal';
import { budgetDb } from '../firebase/firebase';
import FireBaseContext from '../firebase/FirebaseContext';
import BudgetHistory from './Budget_History';

require('numeral/locales/hu');

numeral.locale('hu');

const UserPage = function () {
  const { id } = useParams();
  const [userBudget, dispatch] = useReducer(budgetReducer, []);

  useEffect(() => {
    const unsubscribeUserBudget = budgetDb
      .collection(`${id}`)
      .onSnapshot((snapshot) => {
        const budgetList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (budgetList) {
          dispatch({ type: 'LIST_BUDGET', budgetList });
        }
      });

    return () => unsubscribeUserBudget();
  }, [id]);
  let expenses;
  let incomes;
  let expenseForCloth;
  let incomeForCloth;
  if (userBudget) {
    expenses = userBudget.map((expenseList) => {
      if (typeof expenseList.expense === 'string' && expenseList.isIncomeForCloth !== true) {
        return parseInt(expenseList.expense, 10);
      }
      return 0;
    })
      .reduce((sum, value) => sum + value, 0);

    incomes = userBudget.map((incomeList) => {
      if (typeof incomeList.income === 'string' && expenses.isIncomeForCloth !== true) {
        return parseInt(incomeList.income, 10);
      }
      return 0;
    })
      .reduce((sum, value) => sum + value, 0);

    expenseForCloth = userBudget.map((expenseList) => {
      if (typeof expenseList.expense === 'string' && expenseList.isIncomeForCloth === true) {
        return parseInt(expenseList.expense, 10);
      }
      return 0;
    })
      .reduce((sum, value) => sum + value, 0);

    incomeForCloth = userBudget.map((income) => {
      if (typeof income.income === 'string' && income.isIncomeForCloth === true) {
        return parseInt(income.income, 10);
      }
      return 0;
    })
      .reduce((sum, value) => sum + value, 0);
  }

  const [showExpenses, changeShowExpenses] = React.useState(true);
  const [showIncomes, changeShowIncomes] = React.useState(true);

  const [expenseModalIsOpen, setExpenseModalIsOpen] = React.useState(false);
  function openExpenseModal() {
    setExpenseModalIsOpen(true);
  }
  function closeExpenseModal() {
    setExpenseModalIsOpen(false);
  }
  const [incomeModalIsOpen, setIncomeModalIsOpen] = React.useState(false);
  function openIncomeModal() {
    setIncomeModalIsOpen(true);
  }
  function closeIncomeModal() {
    setIncomeModalIsOpen(false);
  }

  const [sortType, setSortType] = React.useState('date');

  return (
    <>

      <Heading as="h3" size="lg" m={2}>
        {id}
        {' '}
        pénztárcája:
        {' '}
        {id === 'Lóri' ? numeral(incomes - expenses - incomeForCloth).format('0,0[.]00 $') : numeral(incomes - expenses).format('0,0[.]00 $')}
      </Heading>
      {incomeForCloth - expenseForCloth !== 0 ? (
        <h4>
          {id}
          {' '}
          ruhapénze:
          {incomeForCloth - expenseForCloth}
          {' '}
          HUF
        </h4>
      ) : null}
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Button leftIcon="add" variantColor="green" onClick={openIncomeModal} m={2} height="3rem" width="34%">Bevétel</Button>
        <Button leftIcon="minus" variantColor="red" onClick={openExpenseModal} m={2} height="3rem" width="34%">Kiadás</Button>
      </Box>
      <Box display="flex">
        <Text m={2}>Számlatörténet:</Text>
        <Select onChange={(e) => setSortType(e.target.value)}>
          <option value="date">Dátum alapján</option>
          <option value="amount">Összeg alapján</option>
        </Select>
      </Box>
      <Flex m={4} justify="center" align="center">
        <FormLabel htmlFor="Incomes">Bevételek</FormLabel>
        <Switch id="Incomes" size="lg" defaultIsChecked={true} onChange={() => changeShowIncomes(!showIncomes)} />

        <FormLabel ml={10} htmlFor="Expenses">Kiadások</FormLabel>
        <Switch id="Expenses" size="lg" defaultIsChecked={true} onChange={() => changeShowExpenses(!showExpenses)} />
      </Flex>

      <FireBaseContext.Provider value={{ userBudget, dispatch }}>
        <BudgetHistory showExpenses={showExpenses} showIncomes={showIncomes} sortBy={sortType} />
      </FireBaseContext.Provider>

      <ExpenseModal user={id} isOpen={expenseModalIsOpen} onRequestClose={closeExpenseModal} />
      <IncomeModal user={id} isOpen={incomeModalIsOpen} onRequestClose={closeIncomeModal} />

    </>
  );
};

export default UserPage;
