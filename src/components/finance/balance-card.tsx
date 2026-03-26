import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "../ui/card";
import { formatCurrency } from "../../lib/format";

type BalanceCardProps = {
  balance: number;
  income: number;
  expenses: number;
};

export function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  return (
    <Card className="rounded-[28px] border-0 bg-emerald-500 p-6 text-white shadow-none">
      <p className="text-sm text-emerald-50">Saldo Atual</p>
      <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
        {formatCurrency(balance)}
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/15 p-2">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-emerald-50">Receitas</p>
            <p className="font-semibold">{formatCurrency(income)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/15 p-2">
            <ArrowDownRight className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-emerald-50">Despesas</p>
            <p className="font-semibold">{formatCurrency(expenses)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
