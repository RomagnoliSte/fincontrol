import { Container } from "../components/layout/container";
import { Header } from "../components/layout/header";
import { BalanceCard } from "../components/finance/balance-card";
import { QuickAddTransaction } from "../components/finance/quick-add-transaction";
import { TransactionsList } from "../components/finance/transactions-list";
import { useTransactions } from "../hooks/use-transactions";

export function HomePage() {
  const {
    filteredTransactions,
    addTransaction,
    removeTransaction,
    totalIncome,
    totalExpenses,
    balance,
    search,
    setSearch,
    filter,
    setFilter,
  } = useTransactions();

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
          </div>

          <div className="lg:col-span-2">
            <TransactionsList
              transactions={filteredTransactions}
              onDeleteTransaction={removeTransaction}
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
