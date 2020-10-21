import React, { useContext } from 'react'
import IncomeItem from './Income_Item'
import FirebaseContext from '../firebase/FirebaseContext'

const IncomeList = () => {
  const { userBudget } = useContext(FirebaseContext)

  return userBudget.map((income) => (
     <IncomeItem key={income.id} income={income} />
  ))
}

export {IncomeList as default}