import React from 'react';
import Modal from 'react-modal'
import { Box, Button, useToast } from "@chakra-ui/core"

import { budgetDb } from '../firebase/firebase'

Modal.setAppElement('#root')
const ItemDeleteModal = (props) => {
  const toast = useToast()
  const deleteItem = async () => {
    props.onRequestCloseDeleteModal()
    props.closePreviousModal()
    await budgetDb.collection(`${props.user}`).doc(`${props.id}`).delete()
    toast({
      title: "Törölve.",
      status: "error",
      duration: 5000,
      isClosable: true,
    })

  }
  return (
    <Modal
      isOpen={props.isOpen}
      contentLabel="Elem törlése"
      onRequestClose={props.onRequestCloseDeleteModal}
      closePreviousModal={props.closePreviousModal}

    >
      <p>Valóban törölni szeretnéd ezt a tételt?</p>
      <Box display="flex" justifyContent="center"> 
        <Box display="flex" flexDirection="column" minWidth="80%">
      <Button m={2} variantColor="yellow" leftIcon="close" onClick={props.onRequestCloseDeleteModal}>Mégse</Button>
      <Button m={2} variantColor="red" leftIcon="delete" onClick={deleteItem}>Törlés</Button>
      </Box>
      </Box>
    </Modal>
  )
}

export { ItemDeleteModal as default }