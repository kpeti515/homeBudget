/* eslint-disable react/require-default-props */
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
  useDisclosure,
} from '@chakra-ui/core';

import { budgetDb } from '../firebase/firebase';
import { ItemDeleteModal } from './ItemDeleteModal';

export const IncomeForm = ({ defaultValues, user, onRequestClose }) => {
  const { handleSubmit, register } = useForm();
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure(); // deleteModal

  const toast = useToast();
  const onSubmit = async (data) => {
    const itemName = defaultValues ? defaultValues.id : uuidv4();

    const docRef = budgetDb.collection(`${user}`).doc(itemName);
    const inputs = {
      income: data.income,
      reason: data.reason,
      date: data.date,
      isIncomeForCloth: !!data.isIncomeForCloth,
    };
    if (defaultValues) {
      await docRef.update({
        ...inputs,
      });
    } else {
      await docRef.set({
        ...inputs,
      });
    }
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
        <FormLabel htmlFor="income">Összeg:</FormLabel>
        <Input
          defaultValue={defaultValues && defaultValues.income}
          id="income"
          type="number"
          placeholder="Bevétel összege"
          ref={register}
          required
          autoFocus
          name="income"
        />
      </FormControl>

      <FormControl isRequired my={2}>
        <FormLabel htmlFor="reason">Magyarázat</FormLabel>
        <Input
          id="reason"
          defaultValue={defaultValues && defaultValues.reason}
          type="text"
          placeholder="Magyarázat"
          ref={register}
          required
          name="reason"
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
      {id === 'Lóri'
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
          {defaultValues && <Button m={2} variantColor="red" leftIcon="delete" onClick={onOpen}>Törlés</Button>}
          <Button m={2} variantColor="yellow" leftIcon="close" onClick={onRequestClose}>Mégse</Button>
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
          <Button m={2} variantColor="green" leftIcon="check" type="submit">{defaultValues ? 'Módosítás mentése' : 'Mentés'}</Button>
        </Box>
      </Box>
    </form>
  );
};

IncomeForm.propTypes = {
  defaultValues: PropTypes.shape({
    id: PropTypes.string,
    income: PropTypes.string,
    reason: PropTypes.string,
    isIncomeForCloth: PropTypes.bool,
    date: PropTypes.string,
  }),
  user: PropTypes.string,
  onRequestClose: PropTypes.func,
};
