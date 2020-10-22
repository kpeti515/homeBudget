import React from 'react'
import { useParams } from 'react-router-dom'
import IncomeModal from './Income_modal'
import ExpenseModal from './Expense_modal'
import '../css/colorization.css'
import numeral from 'numeral'
require('numeral/locales/hu')
numeral.locale('hu')

const BudgetItem = ({
  budget
}) => {
  let { id } = useParams()
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  if (budget.income) {
    return (
      <React.Fragment>
        <p>
          {budget.date}  <b className="income">+{numeral(budget.income).format('0,0[.]00 $')}</b> - {budget.reason} <button onClick={openModal}>Módosítás</button>
        </p>
        <IncomeModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <p>
        {budget.date}  <b className="expense">-{numeral(budget.expense).format('0,0[.]00 $')}</b> - {budget.item} <button onClick={openModal}>Módosítás</button>
      </p>
      <ExpenseModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
    </React.Fragment>
  )
}

export { BudgetItem as default }