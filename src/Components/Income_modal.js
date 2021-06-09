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

import IncomeForm from './IncomeForm'

const IncomeModal = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: "white", dark: "gray.900" }
  const color = { light: "black", dark: "white" }
  return (
    <Modal
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      isOpen={props.isOpen}
      onClose={props.onRequestClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >{props.defaultValues ? 'Bevétel szerkesztése' : 'Bevétel rögzítése'}
        </ModalHeader>
        <ModalCloseButton
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        />
        <ModalBody
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          <IncomeForm {...props} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export { IncomeModal as default }