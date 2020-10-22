import React, { useReducer, useEffect } from 'react'
import budgetReducer from '../Reducers/budgetReducer'
import { useParams } from 'react-router-dom'
import ExpenseModal from './Expense_modal'
import IncomeModal from './Income_modal'
import { budgetDb } from '../firebase/firebase'
import FireBaseContext from '../firebase/FirebaseContext'
import BudgetHistory from './Budget_History'
import IncomeCheckingModal from './Income_Check'
import numeral from 'numeral'
require('numeral/locales/hu')
numeral.locale('hu')

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
  if (userBudget) {
    var expenses = userBudget.map((expenses) => {
      if (typeof expenses.expense == "string" && expenses.isIncomeForCloth !== true) {
        return parseInt(expenses.expense, 10)
      }
      return 0
    })
      .reduce((sum, value) => sum + value, 0)

    var incomes = userBudget.map((incomes) => {
      if (typeof incomes.income == "string" && expenses.isIncomeForCloth !== true) {
        return parseInt(incomes.income, 10)
      }
      return 0
    })
      .reduce((sum, value) => sum + value, 0)

    var expenseForCloth = userBudget.map((expenses) => {
      if (typeof expenses.expense == "string" && expenses.isIncomeForCloth === true) {
        return parseInt(expenses.expense, 10)
      }
      return 0
    })
      .reduce((sum, value) => sum + value, 0)
    console.log(expenseForCloth)

    var incomeForCloth = userBudget.map((income) => {
      if (typeof income.income == "string" && income.isIncomeForCloth === true) {
        return parseInt(income.income, 10)
      }
      return 0
    })
      .reduce((sum, value) => sum + value, 0)
    console.log(incomeForCloth)
  }


  const [expenseModalIsOpen, setExpenseModalIsOpen] = React.useState(false);
  function openExpenseModal() {
    setExpenseModalIsOpen(true)
  }
  function closeExpenseModal() {
    setExpenseModalIsOpen(false)
  }
  const [incomeModalIsOpen, setIncomeModalIsOpen] = React.useState(false);
  function openIncomeModal() {
    setIncomeModalIsOpen(true)
  }
  function closeIncomeModal() {
    setIncomeModalIsOpen(false)
  }
  const [incomeCheckIsOpen, setIncomeCheckIsOpen] = React.useState(false)
  function openIncomeCheckModal() {
    setIncomeCheckIsOpen(true)
  }
  function closeIncomeCheckModal() {
    setIncomeCheckIsOpen(false)
  }
  const [sortType, setSortType] = React.useState('date')

  return (
    <React.Fragment>
      <button onClick={openExpenseModal}>Kiadás</button>
      <button onClick={openIncomeModal}>Bevétel</button>

      <h3>{id} pénztárcája: {id === 'Lori' ? numeral(incomes - expenses - incomeForCloth).format('0,0[.]00 $') : numeral(incomes - expenses).format('0,0[.]00 $')}</h3>
      {incomeForCloth - expenseForCloth !== 0 ? <h4>{id} Ruhapénze: {incomeForCloth - expenseForCloth} HUF</h4> : null}
      <button onClick={openIncomeCheckModal}>Bevételek ellenőrzése</button>
      <p>Számlatörténet:</p>

      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="date">Dátum alapján</option>
        <option value="amount">Összeg alapján</option>
      </select>
      <FireBaseContext.Provider value={{ userBudget, dispatch }}>
        <BudgetHistory sortBy={sortType} />
        <IncomeCheckingModal user={id} isOpen={incomeCheckIsOpen} onRequestClose={closeIncomeCheckModal} />
      </FireBaseContext.Provider>


      <ExpenseModal user={id} isOpen={expenseModalIsOpen} onRequestClose={closeExpenseModal} />
      <IncomeModal user={id} isOpen={incomeModalIsOpen} onRequestClose={closeIncomeModal} />
    </React.Fragment>
  )
}

export default UserPage