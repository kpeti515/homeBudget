import React from 'react'
import { useForm } from 'react-hook-form'
import { budgetDb } from '../firebase/firebase'
import { v4 as uuidv4 } from 'uuid';


const ExpenseForm = (props) => {

  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {

    const itemName = props.defaultValues.id || uuidv4()

    let docRef = budgetDb.collection(`${props.user}`).doc(itemName)

    const inputs = {
      'expense': data.expense,
      'item': data.item,
      'description': data.description,
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
      <input
        defaultValue={props.defaultValues && props.defaultValues.date}
        type="date"
        name="date"
        ref={register}
        required
      />
      <button>{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</button>
      <button onClick={props.onRequestClose}>Mégse</button>
    </form>
  )

}

export default ExpenseForm;