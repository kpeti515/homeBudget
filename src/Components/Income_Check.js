import React from 'react'
import Modal from 'react-modal'
import IncomeList from './Income_List'

Modal.setAppElement('#root')
const IncomeModal = (props) => {
  
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Kiadás"
      onRequestClose={props.onRequestClose}
    >
      <IncomeList {...props} />
    </Modal>
  )
}

export { IncomeModal as default }