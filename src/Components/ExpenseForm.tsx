import { useForm } from 'react-hook-form';
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
import { CheckIcon, CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';

import { ItemDeleteModal } from './ItemDeleteModal';
import { addBudgetItem, updateBudgetItem } from '../store/budget/budgetSlice';
import { getToday } from '../helpers/functions/dateHelpers';
import { ExpenseItemType } from '../helpers/interfaces';

export const ExpenseForm = ({
  defaultValues,
  user,
  onRequestClose,
}: {
  defaultValues?: ExpenseItemType;
  user: string;
  onRequestClose: () => void;
}) => {
  const { handleSubmit, register } = useForm();
  const { account } = useParams<{ account: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const toast = useToast();
  const onSubmit = (data: {
    expense: string;
    item: string;
    description: string;
    date: string;
    isIncomeForCloth?: boolean;
  }) => {
    const itemName = defaultValues ? defaultValues.id : uuidv4();

    const inputs = {
      expense: data.expense,
      item: data.item,
      description: data.description,
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
