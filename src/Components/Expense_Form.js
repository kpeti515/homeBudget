import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@chakra-ui/core"

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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{props.defaultValues ? 'Kiadás szerkesztése' : 'Kiadás rögzítése'}</h3>
      <input
        defaultValue={props.defaultValues && props.defaultValues.expense}
        type="number"
        placeholder="Kiadás összege"
        ref={register}
        required
        autoFocus
        name="expense"
      />
      <input
        defaultValue={props.defaultValues && props.defaultValues.item}
        type="text"
        placeholder="Tárgy"
        ref={register}
        required
        name="item"
      />
      <input
        defaultValue={props.defaultValues && props.defaultValues.description}
        type="text"
        placeholder="Megjegyzés"
        ref={register}
        name="description"
      />
      <div>
        <label htmlFor="incomeDate">Dátum:</label>
        <input
          defaultValue={props.defaultValues && props.defaultValues.date}
          id="incomeDate"
          type="date"
          name="date"
          required
          ref={register}
        />
      </div>
      { id === 'Lóri' &&
        <div>
          <label htmlFor="isIncomeForCloth">Ruhapénzhez tartozik?</label>
          <input
            defaultChecked={props.defaultValues && props.defaultValues.isIncomeForCloth}
            id="isIncomeForCloth"
            type="checkbox"
            name="isIncomeForCloth"
            ref={register}
          />
        </div>
      }
      {props.defaultValues && <Button variantColor="red" leftIcon="delete" onClick={openDeleteModal}>Törlés</Button>}
      <Button variantColor="yellow" leftIcon="close" onClick={props.onRequestClose}>Mégse</Button>
      {props.defaultValues && <ItemDeleteModal id={props.defaultValues.id} user={props.user} isOpen={deleteModalIsOpen} onRequestCloseDeleteModal={closeDeleteModal} closePreviousModal={props.onRequestClose} />}
      <Button variantColor="green" leftIcon="check" type="submit">{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</Button>
    </form>
  )

}

export default ExpenseForm;