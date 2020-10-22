import React from 'react';
import Modal from 'react-modal'
import { budgetDb } from '../firebase/firebase'

Modal.setAppElement('#root')
const ItemDeleteModal = (props) => {
  const deleteItem = async () => {
    props.onRequestCloseDeleteModal()
    props.closePreviousModal()
    await budgetDb.collection(`${props.user}`).doc(`${props.id}`).delete()

  }
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Elem törlése"
      onRequestClose={props.onRequestCloseDeleteModal}
      closePreviousModal={props.closePreviousModal}

    >
      <p>Valóban törölni szeretnéd ezt a tételt?</p>
      <button onClick={props.onRequestCloseDeleteModal}>Mégse</button>
      <button onClick={deleteItem}>Törlés</button>
    </Modal>
  )
}

export { ItemDeleteModal as default }