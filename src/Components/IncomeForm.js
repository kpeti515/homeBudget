import React from 'react'
import { useForm } from 'react-hook-form'
import { budgetDb } from '../firebase/firebase'
import { v4 as uuidv4 } from 'uuid';

const IncomeForm = (props) => {

  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {
    const itemName = props.defaultValues.id || uuidv4()

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
    </form>
  )
}

export { IncomeForm as default }