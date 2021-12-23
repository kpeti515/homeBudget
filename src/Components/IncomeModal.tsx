/* eslint-disable react/require-default-props */
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { IncomeForm } from './IncomeForm';
import { Income } from '../helpers/interfaces';

export const IncomeModal = ({
  isOpen,
  onRequestClose,
  defaultValues,
  user,
}: {
  isOpen: boolean;
  onRequestClose: VoidFunction;
  defaultValues?: Income;
  user: string;
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={bgColor[colorMode]} color={color[colorMode]}>
          {defaultValues ? 'Bevétel szerkesztése' : 'Bevétel rögzítése'}
        </ModalHeader>
        <ModalCloseButton bg={bgColor[colorMode]} color={color[colorMode]} />
        <ModalBody bg={bgColor[colorMode]} color={color[colorMode]}>
          <IncomeForm
            onRequestClose={onRequestClose}
            defaultValues={defaultValues}
            user={user}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
