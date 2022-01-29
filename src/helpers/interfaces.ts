export interface ExpenseItemForm {
  expense: string;
  isIncomeForCloth: boolean;
  date: string;
  description: string;
  item: string;
}

// export type ExpenseItemType = ExpenseItemForm & { id: string };
export interface ExpenseItemType extends ExpenseItemForm {
  id: string;
}

export interface IncomeItemForm {
  income: string;
  reason: string;
  isIncomeForCloth: boolean;
  date: string;
}

// export type IncomeItemType = IncomeItemForm & { id: string };
export interface IncomeItemType extends IncomeItemForm {
  id: string;
}

export type BudgetItemType = ExpenseItemType | IncomeItemType;

export type BudgetFormType = IncomeItemForm | ExpenseItemForm;

export interface BudgetForm {
  userName: string;
  itemName: string;
  inputs?: BudgetFormType;
}

export interface BudgetHistoryProps {
  showExpenses: boolean;
  showIncomes: boolean;
  sortBy: 'date' | 'amount';
}

interface UserBasicData {
  uid: string;
  email: string;
  displayName: string;
  providerId: string;
  photoURL: string;
  phoneNumber: null | string;
}

interface TokenManagementType {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
}

interface UserMetaData extends UserBasicData {
  emailVerified: boolean;
  isAnonymous: boolean;
  providerData: Array<Record<string, UserBasicData>>;
  stsTokenManager: TokenManagementType;
  createdAt: string;
  lastLoginAt: string;
  apiKey: string;
  appName: string;
}

export interface UserState {
  currentUser: null | UserMetaData;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export interface BudgetState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  accounts: Record<string, Array<BudgetItemType>>;
  error: undefined | string;
}

export interface BudgetItemProps {
  budget: BudgetItemType;
  showExpenses: boolean;
  showIncomes: boolean;
}

export interface ExpenseFormProps {
  defaultValues?: ExpenseItemType;
  user: string;
  onRequestClose: () => void;
}

export interface ExpenseModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: string;
  defaultValues?: ExpenseItemType;
}

export interface IncomeFormProps {
  onRequestClose: VoidFunction;
  defaultValues?: IncomeItemType;
  user: string;
}

export interface IncomeModalProps {
  isOpen: boolean;
  onRequestClose: VoidFunction;
  defaultValues?: IncomeItemType;
  user: string;
}

export interface ItemDeleteModalProps {
  onRequestCloseDeleteModal: VoidFunction;
  closePreviousModal: VoidFunction;
  user: string;
  id: string;
  isOpen: boolean;
}

export interface NavbarProps {
  colorMode: string;
  toggleColorMode: () => void;
}

export type AccountParam = { account: string };
