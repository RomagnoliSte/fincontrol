import { useEffect, useMemo, useState } from "react";
import type {
  Transaction,
  TransactionCategory,
  TransactionFilter,
  TransactionType,
} from "../types/transaction";
import { formatDate } from "../lib/format";

type NewTransactionInput = {
  title: string;
  category: TransactionCategory;
  amount: number;
  type: TransactionType;
};

const STORAGE_KEY = "fincontrol:transactions";

const initialTransactions: Transaction[] = [
  {
    id: crypto.randomUUID(),
    title: "Salário",
    category: "Salário",
    amount: 5000,
    date: "28 de fev.",
    type: "income",
  },
  {
    id: crypto.randomUUID(),
    title: "Supermercado",
    category: "Alimentação",
    amount: 450,
    date: "04 de mar.",
    type: "expense",
  },
  {
    id: crypto.randomUUID(),
    title: "Conta de luz",
    category: "Moradia",
    amount: 180,
    date: "09 de mar.",
    type: "expense",
  },
  {
    id: crypto.randomUUID(),
    title: "Uber",
    category: "Transporte",
    amount: 45,
    date: "14 de mar.",
    type: "expense",
  },
];

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        return JSON.parse(stored) as Transaction[];
      } catch {
        return initialTransactions;
      }
    }

    return initialTransactions;
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TransactionFilter>("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  function addTransaction(data: NewTransactionInput) {
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      title: data.title,
      category: data.category,
      amount: data.amount,
      type: data.type,
      date: formatDate(new Date()),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  }

  function updateTransaction(id: string, data: NewTransactionInput) {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              title: data.title,
              category: data.category,
              amount: data.amount,
              type: data.type,
            }
          : transaction,
      ),
    );
  }

  function removeTransaction(id: string) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id),
    );
  }

  const totalIncome = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((transaction) => transaction.type === "expense")
      .reduce((total, transaction) => total + transaction.amount, 0);
  }, [transactions]);

  const balance = useMemo(() => {
    return totalIncome - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesFilter =
        filter === "all" ? true : transaction.type === filter;

      const term = search.trim().toLowerCase();
      const matchesSearch =
        term === ""
          ? true
          : transaction.title.toLowerCase().includes(term) ||
            transaction.category.toLowerCase().includes(term);

      return matchesFilter && matchesSearch;
    });
  }, [transactions, filter, search]);

  return {
    transactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    removeTransaction,
    totalIncome,
    totalExpenses,
    balance,
    search,
    setSearch,
    filter,
    setFilter,
  };
}
