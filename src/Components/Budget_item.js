import React from 'react'


const BudgetItem = ({
  budget
}) => {
  
  if (budget.income){
    return (
      <React.Fragment>
            <p>{budget.date}  <b>+{budget.income} HUF</b> - {budget.reason}</p>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
          <p>{budget.date}  <b>-{budget.expense} HUF</b> - {budget.item}</p>
    </React.Fragment>
  )
}

export { BudgetItem as default }