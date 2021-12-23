/* eslint-disable react/require-default-props */
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
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
} from '@chakra-ui/react';

import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';

import { ItemDeleteModal } from './ItemDeleteModal';
import { addBudgetItem, updateBudgetItem } from '../store/budget/budgetSlice';
import { getToday } from '../helpers/functions/dateHelpers';
import { Income } from '../helpers/interfaces';

export const IncomeForm = ({
  defaultValues,
  user,
  onRequestClose,
}: {
  onRequestClose: VoidFunction;
  defaultValues?: Income;
  user: string;
}) => {
  const { handleSubmit, register } = useForm();
  const { account } = useParams<{ account: string }>();

  const { isOpen, onOpen, onClose } = useDisclosure(); // deleteModal

  const toast = useToast();
  const dispatch = useDispatch();
  const onSubmit = (data: {
    income: string;
    reason: string;
    date: string;
    isIncomeForCloth?: boolean;
  }) => {
    const itemName = defaultValues ? defaultValues.id : uuidv4();

    const inputs = {
      income: data.income,
      reason: data.reason,
      date: data.date,
      isIncomeForCloth: !!data.isIncomeForCloth,
    };
    defaultValues
      ? dispatch(updateBudgetItem({ userName: user, itemName, inputs }))
      : dispatch(addBudgetItem({ userName: user, itemName, inputs }));
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
          defaultValue={defaultValues ? defaultValues.date : getToday()}
          id="date"
          placeholder="Kiadás összege"
          type="date"
          name="date"
          required
          ref={register}
        />
      </FormControl>
      {account === 'Lóri' && (
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
          {defaultValues && (
            <Button
              m={2}
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
            >
              Törlés
            </Button>
          )}
          <Button
            m={2}
            colorScheme="yellow"
            leftIcon={<CloseIcon />}
            onClick={onRequestClose}
          >
            Mégse
          </Button>
          {defaultValues && (
            <ItemDeleteModal
              id={defaultValues.id}
              user={user}
              isOpen={isOpen}
              onRequestCloseDeleteModal={onClose}
              closePreviousModal={onRequestClose}
            />
          )}
          <Button
            m={2}
            colorScheme="green"
            leftIcon={<CheckIcon />}
            type="submit"
          >
            {defaultValues ? 'Módosítás mentése' : 'Mentés'}
          </Button>
        </Box>
      </Box>
    </form>
  );
};
