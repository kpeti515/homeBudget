import React from 'react'
import { useForm } from 'react-hook-form'
import { budgetDb } from '../firebase/firebase'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import ItemDeleteModal from './Delete_Modal'

const IncomeForm = (props) => {

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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>{props.defaultValues ? 'Bevétel szerkesztése' : 'Bevétel rögzítése'}</h3>
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
      { id === 'Lori' &&
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

      {props.defaultValues && <button onClick={openDeleteModal}>Törlés</button>}
      <button onClick={props.onRequestClose}>Mégse</button>
      {props.defaultValues && <ItemDeleteModal id={props.defaultValues.id} user={props.user} isOpen={deleteModalIsOpen} onRequestCloseDeleteModal={closeDeleteModal} closePreviousModal={props.onRequestClose} />}
      <button>{props.defaultValues ? 'Módosítás mentése' : 'Mentés'}</button>
    </form>
  )
}

export { IncomeForm as default }