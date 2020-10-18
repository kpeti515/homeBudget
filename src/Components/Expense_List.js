import React, { useContext } from 'react'
import ExpenseItem from './Expense_item'
import FirebaseContext from '../firebase/FirebaseContext'

const ExpenseList = () => {
  const { userBudget } = useContext(FirebaseContext)

  return userBudget.map((expense) => (
     <ExpenseItem key={expense.id} expense={expense} />
  ))
}

export {ExpenseList as default}