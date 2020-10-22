import React, { useContext } from 'react'

import BudgetItem from './Budget_item'
import FirebaseContext from '../firebase/FirebaseContext'

const BudgetHistory = (props) => {


  const { userBudget } = useContext(FirebaseContext)

  if (props.sortBy === 'date') {
    return userBudget
      .sort((a, b) => b.date.localeCompare(a.date))
      .map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))
  } else if (props.sortBy === 'amount') {
    return userBudget
      .sort((a, b) => {
        const amountA = a.expense || a.income
        const amountB = b.expense || b.income
        return amountB - amountA
      })
      .map((budget) => (
        <BudgetItem key={budget.id} budget={budget} />
      ))
  }

}
//(a,b) => a.date.localeCompare(b.date)
export { BudgetHistory as default }