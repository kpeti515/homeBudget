/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import {
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';
import { ExpenseForm } from './ExpenseForm';

export const ExpenseModal = ({
  isOpen, onRequestClose, user, defaultValues,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onRequestClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          {defaultValues ? 'Kiadás szerkesztése' : 'Kiadás rögzítése'}
        </ModalHeader>
        <ModalCloseButton
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        />
        <ModalBody
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          <ExpenseForm
            user={user}
            onRequestClose={onRequestClose}
            defaultValues={defaultValues}
            isOpen={isOpen}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ExpenseForm.propTypes = {
  defaultValues: PropTypes.shape({
    id: PropTypes.string,
    income: PropTypes.string,
    reason: PropTypes.string,
    isIncomeForCloth: PropTypes.bool,
    date: PropTypes.string,
  }),
  user: PropTypes.string,
  onRequestClose: PropTypes.func,
  isOpen: PropTypes.bool,
};
