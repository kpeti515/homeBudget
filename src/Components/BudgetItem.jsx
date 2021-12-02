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

export const BudgetItem = ({ budget, showExpenses, showIncomes }) => {
  const { account } = useParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (budget.income && showIncomes === true) {
    return (
      <>
        <Stat
          border="2px"
          borderColor="gray.200"
          borderRadius="md"
          m={3}
          mx={6}
        >
          <StatLabel ml={2}>{budget.reason}</StatLabel>
          <Box className="display__flex" justifyContent="space-between">
            <StatNumber ml={4} fontSize={20}>
              +{numeral(budget.income).format('0,0[.]00 $')}
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
        <IncomeModal
          user={account}
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
        <Stat
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          m={3}
          mx={6}
        >
          <StatLabel ml={2}>{budget.item}</StatLabel>
          <Box className="display__flex" justifyContent="space-between">
            <StatNumber fontSize={20} ml={4}>
              -{numeral(budget.expense).format('0,0[.]00 $')}
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
        <ExpenseModal
          user={account}
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
