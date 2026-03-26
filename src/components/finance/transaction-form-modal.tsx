import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";
import { Select } from "../ui/select";
import { parseCurrencyInput } from "../../lib/format";
import type {
  Transaction,
  TransactionCategory,
  TransactionType,
} from "../../types/transaction";

type TransactionFormModalProps = {
  open: boolean;
  transaction: Transaction | null;
  onClose: () => void;
  onSubmit: (
    id: string,
    data: {
      title: string;
      category: TransactionCategory;
      amount: number;
      type: TransactionType;
    },
  ) => void;
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

function toInputAmount(value: number) {
  return value.toFixed(2).replace(".", ",");
}

export function TransactionFormModal({
  open,
  transaction,
  onClose,
  onSubmit,
}: TransactionFormModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<TransactionCategory>("Outros");
  const [type, setType] = useState<TransactionType>("expense");
  const [errors, setErrors] = useState({
    title: "",
    amount: "",
  });

  useEffect(() => {
    if (!transaction) return;

    setTitle(transaction.title);
    setAmount(toInputAmount(transaction.amount));
    setCategory(transaction.category);
    setType(transaction.type);
    setErrors({
      title: "",
      amount: "",
    });
  }, [transaction]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!transaction) return;

    const nextErrors = {
      title: "",
      amount: "",
    };

    const trimmedTitle = title.trim();
    const parsedAmount = parseCurrencyInput(amount);

    if (!trimmedTitle) {
      nextErrors.title = "Informe uma descrição.";
    }

    if (!amount.trim()) {
      nextErrors.amount = "Informe um valor.";
    } else if (parsedAmount <= 0) {
      nextErrors.amount = "Informe um valor válido maior que zero.";
    }

    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.amount) {
      toast.error("Revise os campos da edição.");
      return;
    }

    onSubmit(transaction.id, {
      title: trimmedTitle,
      category,
      amount: parsedAmount,
      type,
    });

    toast.success("Transação atualizada com sucesso.");
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Editar transação"
      description="Atualize os dados da transação selecionada."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={
              type === "expense"
                ? "rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white"
                : "rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            }
          >
            Despesa
          </button>

          <button
            type="button"
            onClick={() => setType("income")}
            className={
              type === "income"
                ? "rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white"
                : "rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            }
          >
            Receita
          </button>
        </div>

        <div>
          <label
            htmlFor="edit-transaction-title"
            className="mb-2 block text-sm font-medium"
          >
            Descrição
          </label>
          <Input
            id="edit-transaction-title"
            value={title}
            hasError={!!errors.title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title ? (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="edit-transaction-amount"
            className="mb-2 block text-sm font-medium"
          >
            Valor (R$)
          </label>
          <Input
            id="edit-transaction-amount"
            inputMode="decimal"
            value={amount}
            hasError={!!errors.amount}
            onChange={(event) => setAmount(event.target.value)}
            onBlur={() => {
              if (!amount) return;

              const normalized = amount.replace(",", ".");
              const number = Number(normalized);

              if (!Number.isNaN(number)) {
                setAmount(number.toFixed(2).replace(".", ","));
              }
            }}
          />
          {errors.amount ? (
            <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="edit-transaction-category"
            className="mb-2 block text-sm font-medium"
          >
            Categoria
          </label>
          <Select
            id="edit-transaction-category"
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

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Salvar alterações</Button>
        </div>
      </form>
    </Modal>
  );
}
