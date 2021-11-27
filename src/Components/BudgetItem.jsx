/* eslint-disable react/jsx-no-bind */
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
} from '@chakra-ui/core';

import '../css/colorization.css';
import '../css/BudgetItem.css';
import { ExpenseModal } from './ExpenseModal';
import { IncomeModal } from './IncomeModal';

require('numeral/locales/hu');

numeral.locale('hu');

export const BudgetItem = ({
  budget, showExpenses, showIncomes,
}) => {
  const { id } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (budget.income && showIncomes === true) {
    return (
      <>

        <Stat border="1px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
          <StatLabel>{budget.reason}</StatLabel>
          <Box className="display__flex" justifyContent="space-between">
            <StatNumber fontSize={20}>
              +
              {numeral(budget.income).format('0,0[.]00 $')}
            </StatNumber>
            <Button leftIcon="edit" variantColor="yellow" onClick={openModal} m={1}>Módosítás</Button>
          </Box>
          <StatHelpText>{budget.date}</StatHelpText>
        </Stat>
        <IncomeModal
          user={id}
          defaultValues={budget}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      </>
    );
  }
  if (budget.expense && showExpenses === true) {
    return (
      <>
        <Stat border="1px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
          <StatLabel>{budget.item}</StatLabel>
          <Box className="display__flex" justifyContent="space-between">
            <StatNumber fontSize={20}>
              -
              {numeral(budget.expense).format('0,0[.]00 $')}
            </StatNumber>
            <Button leftIcon="edit" variantColor="yellow" onClick={openModal} m={1}>Módosítás</Button>
          </Box>
          <StatHelpText>{budget.date}</StatHelpText>

        </Stat>
        <ExpenseModal
          user={id}
          defaultValues={budget}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
        />
      </>
    );
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
