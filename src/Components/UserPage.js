import React, { useReducer, useEffect } from 'react'
import budgetReducer from '../Reducers/budgetReducer'
import { useParams } from 'react-router-dom'
import ExpenseModal from './Expense_modal'
import IncomeModal from './Income_modal'
import { budgetDb } from '../firebase/firebase'
import FireBaseContext from '../firebase/FirebaseContext'
import ExpenseList from './Expense_List'


function UserPage() {
  let { id } = useParams()
  const [userBudget, dispatch] = useReducer(budgetReducer, [])

  useEffect(() => {

    const unsubscribeUserBudget = budgetDb
      .collection(`${id}`)
      .onSnapshot((snapshot) => {
        const budgetList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        if (budgetList) {
          dispatch({ type: 'LIST_BUDGET', budgetList })
        }
      })

    return () => unsubscribeUserBudget()
  }, [id])


  const [expenseModalIsOpen, setExpenseModalIsOpen] = React.useState(false);
  function openExpenseModal() {
    setExpenseModalIsOpen(true);
  }
  function closeExpenseModal() {
    setExpenseModalIsOpen(false);
  }
  const [incomeModalIsOpen, setIncomeModalIsOpen] = React.useState(false);
  function openIncomeModal() {
    setIncomeModalIsOpen(true);
  }
  function closeIncomeModal() {
    setIncomeModalIsOpen(false);
  }

  return (
    <React.Fragment>
      <button onClick={openExpenseModal}>Kiadás</button>
      <button onClick={openIncomeModal}>Bevétel</button>

      <h3>{id} pénztárcája:</h3>
      <p> Látszon mennyi az elkölthető pénze (egyenleg)</p>
      <p>Költések:</p>
      <FireBaseContext.Provider value={{userBudget, dispatch}}>
      <ExpenseList/>
      </FireBaseContext.Provider>
     
      
      <ExpenseModal user={id} isOpen={expenseModalIsOpen} onRequestClose={closeExpenseModal} />
      <IncomeModal user={id} isOpen={incomeModalIsOpen} onRequestClose={closeIncomeModal} />
    </React.Fragment>
  )
}

export default UserPage