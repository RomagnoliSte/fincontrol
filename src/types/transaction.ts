export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Salário"
  | "Alimentação"
  | "Moradia"
  | "Transporte"
  | "Lazer"
  | "Saúde"
  | "Outros";

export type Transaction = {
  id: string;
  title: string;
  category: TransactionCategory;
  amount: number;
  date: string;
  type: TransactionType;
};

export type TransactionFilter = "all" | TransactionType;
