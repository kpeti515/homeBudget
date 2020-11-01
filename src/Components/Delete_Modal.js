import React from 'react';
import {
  Box, Button, useToast,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"

import { budgetDb } from '../firebase/firebase'

const ItemDeleteModal = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: "white", dark: "gray.700" };
  const color = { light: "black", dark: "white" };
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
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      isOpen={props.isOpen}
      contentLabel="Elem törlése"
      onClose={props.onRequestCloseDeleteModal}
      closePreviousModal={props.closePreviousModal}

    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          Valóban törölni szeretnéd ezt a tételt?
        </ModalHeader>
        <ModalCloseButton
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        />
        <ModalBody
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" minWidth="80%">
              <Button m={2} variantColor="red" leftIcon="delete" onClick={deleteItem}>Törlés</Button>
              <Button m={2} variantColor="yellow" leftIcon="close" onClick={props.onRequestCloseDeleteModal}>Mégse</Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>

    </Modal>
  )
}

export { ItemDeleteModal as default }