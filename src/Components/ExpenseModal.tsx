import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseItemType } from '../helpers/interfaces';

export const ExpenseModal = ({
  isOpen,
  onRequestClose,
  user,
  defaultValues,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  user: string;
  defaultValues?: ExpenseItemType;
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };
  return (
    <Modal isOpen={isOpen} onClose={onRequestClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={bgColor[colorMode]} color={color[colorMode]}>
          {defaultValues ? 'Kiadás szerkesztése' : 'Kiadás rögzítése'}
        </ModalHeader>
        <ModalCloseButton bg={bgColor[colorMode]} color={color[colorMode]} />
        <ModalBody bg={bgColor[colorMode]} color={color[colorMode]}>
          <ExpenseForm
            user={user}
            onRequestClose={onRequestClose}
            defaultValues={defaultValues}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
