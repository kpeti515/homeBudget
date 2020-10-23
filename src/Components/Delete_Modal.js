import React from 'react';
import Modal from 'react-modal'
import { Button } from "@chakra-ui/core"

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
      <Button onClick={props.onRequestCloseDeleteModal}>Mégse</Button>
      <Button onClick={deleteItem}>Törlés</Button>
    </Modal>
  )
}

export { ItemDeleteModal as default }