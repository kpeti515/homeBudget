import {
  Box,
  Button,
  useToast,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { deleteBudgetItem } from '../store/budget/budgetSlice';
import { ItemDeleteModalProps } from '../helpers/interfaces';

export const ItemDeleteModal: React.FC<ItemDeleteModalProps> = ({
  onRequestCloseDeleteModal,
  closePreviousModal,
  user,
  id,
  isOpen,
}: ItemDeleteModalProps) => {
  const { colorMode } = useColorMode();
  const bgColor = { light: 'white', dark: 'gray.700' };
  const color = { light: 'black', dark: 'white' };
  const toast = useToast();
  const dispatch = useDispatch();

  const deleteItem = () => {
    onRequestCloseDeleteModal();
    closePreviousModal();

    dispatch(deleteBudgetItem({ userName: user, itemName: id }));

    toast({
      title: 'Törölve.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onRequestCloseDeleteModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={bgColor[colorMode]} color={color[colorMode]}>
          Valóban törölni szeretnéd ezt a tételt?
        </ModalHeader>
        <ModalCloseButton bg={bgColor[colorMode]} color={color[colorMode]} />
        <ModalBody bg={bgColor[colorMode]} color={color[colorMode]}>
          <Box display="flex" justifyContent="center">
            <Box display="flex" flexDirection="column" minWidth="80%">
              <Button
                m={2}
                colorScheme="red"
                leftIcon={<DeleteIcon />}
                onClick={deleteItem}
              >
                Törlés
              </Button>
              <Button
                m={2}
                colorScheme="yellow"
                leftIcon={<CloseIcon />}
                onClick={onRequestCloseDeleteModal}
              >
                Mégse
              </Button>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
