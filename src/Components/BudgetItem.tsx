import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { BudgetItemType } from '../helpers/interfaces';

const RegularBudgetItem = ({ budget }: { budget: BudgetItemType }) => {
  const { account } = useParams<{ account: string }>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Stat border="2px" borderColor="gray.200" borderRadius="md" m={3} mx={6}>
        <StatLabel ml={2}>
          {'expense' in budget ? budget.item : budget.reason}
        </StatLabel>
        <Box className="display__flex" justifyContent="space-between">
          <StatNumber ml={4} fontSize={20}>
            {'expense' in budget
              ? `-${Number(budget.expense).toLocaleString('hu')} Ft`
              : `+${Number(budget.income).toLocaleString('hu')} Ft`}
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
      {'expense' in budget ? (
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

export const BudgetItem = ({
  budget,
  showExpenses,
  showIncomes,
}: {
  budget: BudgetItemType;
  showExpenses: boolean;
  showIncomes: boolean;
}) => {
  if ('income' in budget && showIncomes) {
    return <RegularBudgetItem budget={budget} />;
  }
  if ('expense' in budget && showExpenses) {
    return <RegularBudgetItem budget={budget} />;
  }
  return null;
};
