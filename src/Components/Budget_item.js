import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
  Flex,
} from "@chakra-ui/core"
import IncomeModal from './Income_modal'
import ExpenseModal from './Expense_modal'
import '../css/colorization.css'
import numeral from 'numeral'
require('numeral/locales/hu')
numeral.locale('hu')

const BudgetItem = ({
  budget, showExpenses, showIncomes
}) => {
  let { id } = useParams()
  const [modalIsOpen, setIsOpen] = React.useState(false)
  function openModal() {
    setIsOpen(true)
  }
  function closeModal() {
    setIsOpen(false)
  }

  if (budget.income && showIncomes === true) {
    return (
      <React.Fragment>
        <Stat border="1px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
          <StatLabel>{budget.reason}</StatLabel>
          <Box display={Flex} justifyContent="space-between">
            <StatNumber fontSize={20}>
              +{numeral(budget.income).format('0,0[.]00 $')}
            </StatNumber>
            <Button leftIcon="edit" variantColor="yellow" onClick={openModal} m={1}>Módosítás</Button>
          </Box>
          <StatHelpText>{budget.date}</StatHelpText>
        </Stat>
        <IncomeModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
      </React.Fragment>
    )
  }
  if (budget.expense && showExpenses === true ) {
    return (
      <React.Fragment>
        <Stat border="1px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
          <StatLabel>{budget.item}</StatLabel>
          <Box display={Flex} justifyContent="space-between">
            <StatNumber fontSize={20}>
              -{numeral(budget.expense).format('0,0[.]00 $')}
            </StatNumber>
            <Button leftIcon="edit" variantColor="yellow" onClick={openModal} m={1}>Módosítás</Button>
          </Box>
          <StatHelpText>{budget.date}</StatHelpText>
        </Stat>
        <ExpenseModal user={id} defaultValues={budget} isOpen={modalIsOpen} onRequestClose={closeModal} />
      </React.Fragment>
    )
  }
  else return null
}

export { BudgetItem as default }