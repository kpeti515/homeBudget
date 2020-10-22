import React from 'react'
import { useForm } from 'react-hook-form'
import { budgetDb } from '../firebase/firebase'
import { v4 as uuidv4 } from 'uuid';
import ItemDeleteModal from './Delete_Modal'

const IncomeForm = (props) => {

  const { handleSubmit, register } = useForm()
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
      'income': data.income,
      'reason': data.reason,
      'date': data.date
    }
    console.log(inputs, props.user);
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
      <input
      defaultValue={props.defaultValues && props.defaultValues.income}
        type="number"
        placeholder="Bevétel összege"
        ref={register}
        required
        autoFocus
        name="income"
      />
      <input
      defaultValue={props.defaultValues && props.defaultValues.reason}
        type="text"
        placeholder="Magyarázat"
        ref={register}
        required
        name="reason"
      />
      <input
      defaultValue={props.defaultValues && props.defaultValues.date}
          type="date"
          name="date"
          ref={register}
        />
      <button>{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</button>
      <button onClick={props.onRequestClose}>Mégse</button>
      {props.defaultValues && <button  onClick={openDeleteModal}>Törlés</button>}
      {props.defaultValues && <ItemDeleteModal id={props.defaultValues.id} user={props.user} isOpen={deleteModalIsOpen} onRequestCloseDeleteModal={closeDeleteModal} closePreviousModal={props.onRequestClose}/>}
    </form>
  )
}

export { IncomeForm as default }