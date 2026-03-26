import { Card } from "../ui/card";
import { EmptyState } from "../ui/empty-state";
import type { Transaction, TransactionFilter } from "../../types/transaction";
import { TransactionItem } from "./transaction-item";
import { TransactionsToolbar } from "./transactions-toolbar";

type TransactionsListProps = {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  onDeleteTransaction: (transaction: Transaction) => void;
  search: string;
  onSearchChange: (value: string) => void;
  filter: TransactionFilter;
  onFilterChange: (value: TransactionFilter) => void;
};

export function TransactionsList({
  transactions,
  onEditTransaction,
  onDeleteTransaction,
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: TransactionsListProps) {
  return (
    <Card className="rounded-[28px] p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Transações Recentes
        </h2>

        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {transactions.length} item(ns)
        </span>
      </div>

      <TransactionsToolbar
        search={search}
        onSearchChange={onSearchChange}
        filter={filter}
        onFilterChange={onFilterChange}
      />

      {transactions.length === 0 ? (
        <EmptyState
          title="Nenhuma transação encontrada"
          description="Tente mudar o filtro ou buscar por outro termo."
        />
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEditTransaction}
              onDelete={onDeleteTransaction}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
