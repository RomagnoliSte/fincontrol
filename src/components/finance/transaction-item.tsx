import { ArrowDownRight, ArrowUpRight, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { formatCurrency } from "../../lib/format";
import { cn } from "../../lib/utils";
import type { Transaction } from "../../types/transaction";

type TransactionItemProps = {
  transaction: Transaction;
  onDelete: (id: string) => void;
};

export function TransactionItem({
  transaction,
  onDelete,
}: TransactionItemProps) {
  const isIncome = transaction.type === "income";

  function handleDelete() {
    onDelete(transaction.id);
    toast.success("Transação removida com sucesso.");
  }

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

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl p-2 text-zinc-400 transition hover:bg-zinc-100 hover:text-red-500 dark:hover:bg-zinc-800"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
