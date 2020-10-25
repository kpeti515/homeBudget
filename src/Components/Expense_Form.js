import React from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, FormControl, FormLabel, Input, Checkbox, Heading, useToast } from "@chakra-ui/core"

import { budgetDb } from '../firebase/firebase'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import ItemDeleteModal from './Delete_Modal'


const ExpenseForm = (props) => {

  const { handleSubmit, register } = useForm()
  let { id } = useParams()
  const [deleteModalIsOpen, setDeleteModalIsOpen] = React.useState(false);
  function openDeleteModal(e) {
    e.preventDefault()
    setDeleteModalIsOpen(true);
  }
  function closeDeleteModal() {
    setDeleteModalIsOpen(false);
  }
  const toast = useToast()
  const onSubmit = async (data) => {

    const itemName = props.defaultValues ? props.defaultValues.id : uuidv4()
    
    let docRef = budgetDb.collection(`${props.user}`).doc(itemName)

    const inputs = {
      'expense': data.expense,
      'item': data.item,
      'description': data.description,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading as="h3" size="lg" my={2}>{props.defaultValues ? 'Kiadás szerkesztése' : 'Kiadás rögzítése'}</Heading>
      <FormControl isRequired my={2}>
        <FormLabel htmlFor="expense">Összeg:</FormLabel>
        <Input
          defaultValue={props.defaultValues && props.defaultValues.expense}
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
        <Input id="item"
          defaultValue={props.defaultValues && props.defaultValues.item}
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
          defaultValue={props.defaultValues && props.defaultValues.description}
          type="text"
          placeholder="Megjegyzés"
          ref={register}
          name="description"
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


      { id === 'Lóri' &&
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
          {props.defaultValues && <Button m={2} variantColor="red" leftIcon="delete" onClick={openDeleteModal}>Törlés</Button>}
          <Button m={2} variantColor="yellow" leftIcon="close" onClick={props.onRequestClose}>Mégse</Button>
          {props.defaultValues && <ItemDeleteModal id={props.defaultValues.id} user={props.user} isOpen={deleteModalIsOpen} onRequestCloseDeleteModal={closeDeleteModal} closePreviousModal={props.onRequestClose} />}
          <Button m={2} variantColor="green" leftIcon="check" type="submit">{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</Button>
        </Box>
      </Box>
    </form>
  )

}

export default ExpenseForm;