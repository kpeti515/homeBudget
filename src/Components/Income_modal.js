import React from 'react';
import Modal from 'react-modal'
import IncomeForm from './IncomeForm';

Modal.setAppElement('#root')
const IncomeModal = (props) => {
  
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Kiadás"
      onRequestClose={props.onRequestClose}
    >
      <IncomeForm {...props} />
    </Modal>
  )
}

export { IncomeModal as default }