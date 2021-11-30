/* eslint-disable react/require-default-props */
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { setDoc, doc } from 'firebase/firestore';
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { budgetDb } from '../firebase/firebase';

import { ItemDeleteModal } from './ItemDeleteModal';

export const ExpenseForm = ({ defaultValues, user, onRequestClose }) => {
  const { handleSubmit, register } = useForm();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const onSubmit = async (data) => {
    const itemName = defaultValues ? defaultValues.id : uuidv4();

    const inputs = {
      expense: data.expense,
      item: data.item,
      description: data.description,
      date: data.date,
      isIncomeForCloth: !!data.isIncomeForCloth,
    };

    await setDoc(doc(budgetDb, user, itemName), inputs);

    onRequestClose();
    toast({
      title: 'Mentve.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired my={2}>
        <FormLabel htmlFor="expense">Összeg:</FormLabel>
        <Input
          defaultValue={defaultValues && defaultValues.expense}
          id="expense"
          placeholder="Kiadás összege"
          type="number"
          ref={register}
          name="expense"
          autoFocus
        />
      </FormControl>

      <FormControl isRequired my={2}>
        <FormLabel htmlFor="item">Tárgy</FormLabel>
        <Input
          id="item"
          defaultValue={defaultValues && defaultValues.item}
          type="text"
          placeholder="Tárgy"
          ref={register}
          required
          name="item"
        />
      </FormControl>

      <FormControl my={2}>
        <FormLabel htmlFor="description">Megjegyzés</FormLabel>
        <Input
          id="description"
          defaultValue={defaultValues && defaultValues.description}
          type="text"
          placeholder="Megjegyzés"
          ref={register}
          name="description"
        />
      </FormControl>

      <FormControl isRequired my={2}>
        <FormLabel htmlFor="date">Dátum:</FormLabel>
        <Input
          defaultValue={defaultValues && defaultValues.date}
          id="date"
          placeholder="Kiadás összege"
          type="date"
          name="date"
          required
          ref={register}
        />
      </FormControl>

      { id === 'Lóri'
        && (
        <Checkbox
          defaultIsChecked={defaultValues && defaultValues.isIncomeForCloth}
          name="isIncomeForCloth"
          ref={register}
          my={2}
        >
          Ruhapénzhez tartozik
        </Checkbox>
        )}
      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" minWidth="80%">
          {defaultValues && <Button m={2} colorScheme="red" leftIcon={<DeleteIcon />} onClick={onOpen}>Törlés</Button>}
          <Button m={2} colorScheme="yellow" leftIcon={<CloseIcon />} onClick={onRequestClose}>Mégse</Button>
          {defaultValues
          && (
          <ItemDeleteModal
            id={defaultValues.id}
            user={user}
            isOpen={isOpen}
            onRequestCloseDeleteModal={onClose}
            closePreviousModal={onRequestClose}
          />
          )}
          <Button m={2} colorScheme="green" leftIcon={<CheckIcon />} type="submit">{defaultValues ? 'Módosítás mentése' : 'Mentés'}</Button>
        </Box>
      </Box>
    </form>
  );
};

ExpenseForm.propTypes = {
  defaultValues: PropTypes.shape({
    id: PropTypes.string,
    expense: PropTypes.string,
    isIncomeForCloth: PropTypes.bool,
    date: PropTypes.string,
    description: PropTypes.string,
    item: PropTypes.string,
  }),
  user: PropTypes.string.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};
