import React from 'react'
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core"
import ExpenseForm from './Expense_Form'

const ExpenseModal = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: "white", dark: "gray.900" }
  const color = { light: "black", dark: "white" }
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onRequestClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          {props.defaultValues ? 'Kiadás szerkesztése' : 'Kiadás rögzítése'}
          </ModalHeader>
          <ModalCloseButton
            bg={bgColor[colorMode]}
            color={color[colorMode]}
          />
          <ModalBody
            bg={bgColor[colorMode]}
            color={color[colorMode]}
          >
            <ExpenseForm {...props} />
          </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export { ExpenseModal as default}