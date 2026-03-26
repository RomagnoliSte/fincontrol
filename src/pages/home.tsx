import { useState } from "react";
import { toast } from "sonner";
import { Container } from "../components/layout/container";
import { Header } from "../components/layout/header";
import { BalanceCard } from "../components/finance/balance-card";
import { QuickAddTransaction } from "../components/finance/quick-add-transaction";
import { TransactionsList } from "../components/finance/transactions-list";
import { CategorySummary } from "../components/finance/category-summary";
import { TransactionFormModal } from "../components/finance/transaction-form-modal";
import { ConfirmDialog } from "../components/ui/confirm-dialog";
import { useTransactions } from "../hooks/use-transactions";
import type { Transaction } from "../types/transaction";

export function HomePage() {
  const {
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
  } = useTransactions();

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] =
    useState<Transaction | null>(null);

  function handleConfirmDelete() {
    if (!deletingTransaction) return;

    removeTransaction(deletingTransaction.id);
    toast.success("Transação removida com sucesso.");
    setDeletingTransaction(null);
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-50">
      <Container className="py-8">
        <Header />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <BalanceCard
              balance={balance}
              income={totalIncome}
              expenses={totalExpenses}
            />

            <QuickAddTransaction onAddTransaction={addTransaction} />

            <CategorySummary transactions={transactions} />
          </div>

          <div className="lg:col-span-2">
            <TransactionsList
              transactions={filteredTransactions}
              onEditTransaction={setEditingTransaction}
              onDeleteTransaction={setDeletingTransaction}
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </div>
      </Container>

      <TransactionFormModal
        open={!!editingTransaction}
        transaction={editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSubmit={updateTransaction}
      />

      <ConfirmDialog
        open={!!deletingTransaction}
        title="Excluir transação"
        description={
          deletingTransaction
            ? `Deseja realmente excluir "${deletingTransaction.title}"?`
            : ""
        }
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTransaction(null)}
      />
    </div>
  );
}
