import React from 'react';
import Modal from 'react-modal'
import ExpenseForm from './Expense_Form';

Modal.setAppElement('#root')
const ExpenseModal = (props) => {
  
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Kiadás"
      onRequestClose={props.onRequestClose}
    >
      <ExpenseForm {...props} />
    </Modal>
  )
}

export { ExpenseModal as default }