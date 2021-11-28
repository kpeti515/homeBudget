import PropTypes from 'prop-types';
import {
  Box, Button, useToast,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/core';

import { doc, deleteDoc } from 'firebase/firestore';
import { budgetDb } from '../firebase/firebase';

export const ItemDeleteModal = ({
  onRequestCloseDeleteModal, closePreviousModal, user, id, isOpen,
}) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.700' };
  const color = { light: 'black', dark: 'white' };
  const toast = useToast();

  const deleteItem = async () => {
    onRequestCloseDeleteModal();
    closePreviousModal();

    await deleteDoc(doc(budgetDb, user, id));

    toast({
      title: 'Törölve.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      isOpen={isOpen}
      contentLabel="Elem törlése"
      onClose={onRequestCloseDeleteModal}
      closePreviousModal={closePreviousModal}

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
              <Button m={2} variantColor="yellow" leftIcon="close" onClick={onRequestCloseDeleteModal}>Mégse</Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ItemDeleteModal.propTypes = {
  id: PropTypes.string.isRequired,
  onRequestCloseDeleteModal: PropTypes.func.isRequired,
  closePreviousModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};