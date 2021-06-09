import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  useToast,
  useDisclosure
} from "@chakra-ui/core"

import { budgetDb } from '../firebase/firebase'

import ItemDeleteModal from './Delete_Modal'

const IncomeForm = (props) => {
  let { id } = useParams()
  const { handleSubmit, register } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const onSubmit = async (data) => {
    const itemName = props.defaultValues ? props.defaultValues.id : uuidv4()
    let docRef = budgetDb.collection(`${props.user}`).doc(itemName)
    const inputs = {
      'income': data.income,
      'reason': data.reason,
      'date': data.date,
      'isIncomeForCloth': data.isIncomeForCloth ? true : false
    }
    if (props.defaultValues) {
      await docRef.update({
        ...inputs
      })
    } else {
      await docRef.set({
        ...inputs
      })
    }
    props.onRequestClose()
    toast({
      title: "Mentve.",
      status: "success",
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <FormControl isRequired my={2}>
        <FormLabel htmlFor="income">Összeg:</FormLabel>
        <Input
          defaultValue={props.defaultValues && props.defaultValues.income}
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
        <Input id="reason"
          defaultValue={props.defaultValues && props.defaultValues.reason}
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
          defaultValue={props.defaultValues && props.defaultValues.date}
          id="date"
          placeholder="Kiadás összege"
          type="date"
          name="date"
          required
          ref={register}
        />
      </FormControl>

      {id === 'Lóri' &&
        <Checkbox
          defaultIsChecked={props.defaultValues && props.defaultValues.isIncomeForCloth}
          name="isIncomeForCloth"
          ref={register}
          my={2}
        >
          Ruhapénzhez tartozik
          </Checkbox>
      }

      <Box display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" minWidth="80%">
          {props.defaultValues && <Button m={2} variantColor="red" leftIcon="delete" onClick={onOpen}>Törlés</Button>}
          <Button m={2} variantColor="yellow" leftIcon="close" onClick={props.onRequestClose}>Mégse</Button>
          {props.defaultValues && <ItemDeleteModal id={props.defaultValues.id} user={props.user} isOpen={isOpen} onRequestCloseDeleteModal={onClose} closePreviousModal={props.onRequestClose} />}
          <Button m={2} variantColor="green" leftIcon="check" type="submit">{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</Button>
        </Box>
      </Box>
    </form>
  )
}

export { IncomeForm as default }