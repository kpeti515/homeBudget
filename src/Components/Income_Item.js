import React from 'react'


const IncomeItem = ({
  income
}) => {
  
  if (!income.income){
    return null
  }
  return (
    <React.Fragment>
          <p> {income.date} Összeg: <b>{income.income} HUF</b> - Bevétel oka: {income.reason}</p>
    </React.Fragment>
  )
}

export { IncomeItem as default }