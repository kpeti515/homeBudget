/* eslint-disable react/require-default-props */
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

import { IncomeForm } from './IncomeForm';

export const IncomeModal = ({
  isOpen, onRequestClose, defaultValues, user,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.900' };
  const color = { light: 'black', dark: 'white' };
  return (
    <Modal
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      isOpen={isOpen}
      onClose={onRequestClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          {defaultValues ? 'Bevétel szerkesztése' : 'Bevétel rögzítése'}
        </ModalHeader>
        <ModalCloseButton
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        />
        <ModalBody
          bg={bgColor[colorMode]}
          color={color[colorMode]}
        >
          <IncomeForm
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            defaultValues={defaultValues}
            user={user}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

IncomeModal.propTypes = {
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
