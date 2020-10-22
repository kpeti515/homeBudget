import React from 'react'
import { useParams } from 'react-router-dom'
import IncomeModal from './Income_modal'
import ExpenseModal from './Expense_modal'


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
        <p>{budget.date}  <b>+{budget.income} HUF</b> - {budget.reason} <button onClick={openModal}>Módosítás</button></p>
        <IncomeModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <p>
        {budget.date}  <b>-{budget.expense} HUF</b> - {budget.item} <button onClick={openModal}>Módosítás</button>
      </p>
      <ExpenseModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
    </React.Fragment>
  )
}

export { BudgetItem as default }