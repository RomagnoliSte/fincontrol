import { ArrowDownRight, ArrowUpRight, Pencil, Trash2 } from "lucide-react";
import { Card } from "../ui/card";
import { formatCurrency } from "../../lib/format";
import { cn } from "../../lib/utils";
import type { Transaction } from "../../types/transaction";

type TransactionItemProps = {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
};

export function TransactionItem({
  transaction,
  onEdit,
  onDelete,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  return (
    <Card className="rounded-2xl p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "rounded-2xl p-3",
              isIncome
                ? "bg-emerald-100 text-emerald-600"
                : "bg-red-100 text-red-500",
            )}
          >
            {isIncome ? (
              <ArrowUpRight className="h-5 w-5" />
            ) : (
              <ArrowDownRight className="h-5 w-5" />
            )}
          </div>

          <div>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              {transaction.title}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {transaction.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p
              className={cn(
                "text-xl font-semibold",
                isIncome ? "text-emerald-600" : "text-red-500",
              )}
            >
              {isIncome ? "+" : "-"}
              {formatCurrency(transaction.amount)}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {transaction.date}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(transaction)}
              className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              aria-label={`Editar ${transaction.title}`}
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onDelete(transaction)}
              className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
              aria-label={`Excluir ${transaction.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
