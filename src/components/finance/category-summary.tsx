import { Card } from "../ui/card";
import { formatCurrency } from "../../lib/format";
import type { Transaction } from "../../types/transaction";

type CategorySummaryProps = {
  transactions: Transaction[];
};

export function CategorySummary({ transactions }: CategorySummaryProps) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense",
  );

  const grouped = expenses.reduce<Record<string, number>>(
    (acc, transaction) => {
      acc[transaction.category] =
        (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    },
    {},
  );

  const sortedCategories = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  return (
    <Card className="rounded-[28px] p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Resumo por categoria
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Veja onde você está gastando mais.
        </p>
      </div>

      {sortedCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          Ainda não existem despesas para resumir.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedCategories.map(([category, total]) => (
            <div
              key={category}
              className="flex items-center justify-between rounded-2xl bg-zinc-50 px-4 py-3 dark:bg-zinc-900/60"
            >
              <span className="font-medium text-zinc-800 dark:text-zinc-100">
                {category}
              </span>
              <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">
                {formatCurrency(total)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
