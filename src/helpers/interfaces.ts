export interface Expense {
  id: string;
  expense: string;
  isIncomeForCloth: boolean;
  date: string;
  description: string;
  item: string;
}

export interface Income {
  id: string;
  income: string;
  reason: string;
  isIncomeForCloth: boolean;
  date: string;
}

export type Budget = Expense | Income;

export interface BudgetHistoryProps {
  showExpenses: boolean;
  showIncomes: boolean;
  sortBy: 'date' | 'amount';
}
