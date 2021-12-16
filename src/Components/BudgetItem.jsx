import { useState } from 'react';
import { useParams } from 'react-router-dom';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Button,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Box,
} from '@chakra-ui/react';

import '../css/colorization.css';
import '../css/BudgetItem.css';
import { EditIcon } from '@chakra-ui/icons';
import { ExpenseModal } from './ExpenseModal';
import { IncomeModal } from './IncomeModal';

require('numeral/locales/hu');

numeral.locale('hu');

const RegularBudgetItem = ({ type, budget }) => {
  const { account } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Stat border="2px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
        <StatLabel ml={2}>
          {type === 'expense' ? budget.item : budget.reason}
        </StatLabel>
        <Box className="display__flex" justifyContent="space-between">
          <StatNumber ml={4} fontSize={20}>
            {type === 'expense'
              ? `-${numeral(budget.expense).format('0,0[.]00 $')}`
              : `+${numeral(budget.income).format('0,0[.]00 $')}`}
          </StatNumber>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="yellow"
            onClick={openModal}
            mr={4}
          >
            Módosítás
          </Button>
        </Box>
        <StatHelpText ml={2}>{budget.date}</StatHelpText>
      </Stat>
      {type === 'expense' ? (
        <ExpenseModal
          user={account}
          defaultValues={budget}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      ) : (
        <IncomeModal
          user={account}
          defaultValues={budget}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
};

export const BudgetItem = ({ budget, showExpenses, showIncomes }) => {
  if (budget.income && showIncomes === true) {
    return <RegularBudgetItem type="income" budget={budget} />;
  }
  if (budget.expense && showExpenses === true) {
    return <RegularBudgetItem type="expense" budget={budget} />;
  }
  return null;
};

BudgetItem.propTypes = {
  budget: PropTypes.shape({
    reason: PropTypes.string,
    income: PropTypes.string,
    expense: PropTypes.string,
    date: PropTypes.string,
    item: PropTypes.string,
  }).isRequired,
  showExpenses: PropTypes.bool.isRequired,
  showIncomes: PropTypes.bool.isRequired,
};

RegularBudgetItem.propTypes = {
  budget: PropTypes.shape({
    reason: PropTypes.string,
    income: PropTypes.string,
    expense: PropTypes.string,
    date: PropTypes.string,
    item: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};
