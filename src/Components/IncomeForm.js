import React from 'react'
import { useForm } from 'react-hook-form'
import { budgetDb } from '../firebase/firebase'
import { v4 as uuidv4 } from 'uuid';

const IncomeForm = (props) => {

  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {

    const itemName = uuidv4()

    let docRef = budgetDb.collection(`${props.user}`).doc(itemName)

    const inputs = {
      'income': data.income,
      'reason': data.reason,
      'date': data.date
    }
    console.log(inputs, props.user);
    await docRef.set({
      ...inputs
    })
    props.onRequestClose()

   
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="Bevétel összege"
        ref={register}
        required
        autoFocus
        name="income"
      />
      <input
        type="text"
        placeholder="Magyarázat"
        ref={register}
        required
        name="reason"
      />
      <input
          type="date"
          name="date"
          ref={register}
        />
      <button>Submit</button>
      <button onClick={props.onRequestClose}>Mégse</button>
    </form>
  )
}

export { IncomeForm as default }