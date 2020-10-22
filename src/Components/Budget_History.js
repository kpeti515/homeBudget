import React, { useContext } from 'react'
import BudgetItem from './Budget_item'
import FirebaseContext from '../firebase/FirebaseContext'

const BudgetHistory = () => {
  const { userBudget } = useContext(FirebaseContext)

  return userBudget.map((budget) => (
     <BudgetItem key={budget.id} budget={budget} />
  ))
}

export {BudgetHistory as default}