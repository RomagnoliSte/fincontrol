import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { cn } from "../../lib/utils";
import type {
  TransactionCategory,
  TransactionType,
} from "../../types/transaction";

type QuickAddTransactionProps = {
  onAddTransaction: (data: {
    title: string;
    category: TransactionCategory;
    amount: number;
    type: TransactionType;
  }) => void;
};

const categories: TransactionCategory[] = [
  "Salário",
  "Alimentação",
  "Moradia",
  "Transporte",
  "Lazer",
  "Saúde",
  "Outros",
];

function getTypeButtonClass(isActive: boolean, type: TransactionType) {
  return cn(
    "rounded-xl px-4 py-3 text-sm font-semibold transition",
    isActive
      ? type === "expense"
        ? "bg-red-500 text-white"
        : "bg-emerald-600 text-white"
      : "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800",
  );
}

export function QuickAddTransaction({
  onAddTransaction,
}: QuickAddTransactionProps) {
  const [type, setType] = useState<TransactionType>("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("Outros");
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = {
      title: "",
      amount: "",
    };

    const trimmedTitle = title.trim();
    const normalizedAmount = amount.replace(",", ".");
    const parsedAmount = Number(normalizedAmount);

    if (!trimmedTitle) {
      nextErrors.title = "Informe uma descrição.";
    }

    if (!amount.trim()) {
      nextErrors.amount = "Informe um valor.";
    } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Informe um valor válido maior que zero.";
    }

    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.amount) {
      toast.error("Revise os campos do formulário.");
      return;
    }

    onAddTransaction({
      title: trimmedTitle,
      amount: parsedAmount,
      category,
      type,
    });

    toast.success(
      type === "income"
        ? "Receita adicionada com sucesso."
        : "Despesa adicionada com sucesso.",
    );

    setTitle("");
    setAmount("");
    setCategory("Outros");
    setType("expense");
    setErrors({
      title: "",
      amount: "",
    });
  }

  return (
    <Card className="rounded-[28px] p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-600">
          <Plus className="h-5 w-5" />
        </div>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Adicionar Transação
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={getTypeButtonClass(type === "expense", "expense")}
          >
            Despesa
          </button>

          <button
            type="button"
            onClick={() => setType("income")}
            className={getTypeButtonClass(type === "income", "income")}
          >
            Receita
          </button>
        </div>

        <div>
          <label
            htmlFor="transaction-title"
            className="mb-2 block text-sm font-medium"
          >
            Descrição
          </label>
          <Input
            id="transaction-title"
            placeholder="Ex: Compras no supermercado"
            value={title}
            hasError={!!errors.title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="transaction-amount"
            className="mb-2 block text-sm font-medium"
          >
            Valor (R$)
          </label>
          <Input
            id="transaction-amount"
            inputMode="decimal"
            placeholder="0,00"
            value={amount}
            hasError={!!errors.amount}
            onChange={(event) => {
              const value = event.target.value.replace(/[^\d,.-]/g, ""); // limpa caracteres inválidos
              setAmount(value);
            }}
            onBlur={() => {
              if (!amount) return;

              const normalized = amount.replace(",", ".");
              const number = Number(normalized);

              if (!Number.isNaN(number)) {
                const formatted = number.toFixed(2).replace(".", ",");
                setAmount(formatted);
              }
            }}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="transaction-category"
            className="mb-2 block text-sm font-medium"
          >
            Categoria
          </label>
          <Select
            id="transaction-category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as TransactionCategory)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        </div>

        <Button className="w-full rounded-xl py-3 text-base font-semibold">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </form>
    </Card>
  );
}
