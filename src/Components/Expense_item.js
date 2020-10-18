import React from 'react'


const ExpenseItem = ({
  expense
}) => {
  
  if (!expense.expense){
    return null
  }
  return (
    <React.Fragment>
          <p>{expense.expense}HUF - {expense.item}</p>
    </React.Fragment>
  )
}

export { ExpenseItem as default }