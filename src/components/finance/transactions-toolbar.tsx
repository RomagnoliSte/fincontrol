import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import type { TransactionFilter } from "../../types/transaction";

type TransactionsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filter: TransactionFilter;
  onFilterChange: (value: TransactionFilter) => void;
};

export function TransactionsToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: TransactionsToolbarProps) {
  return (
    <div className="mb-6 grid gap-3 md:grid-cols-[1fr_180px]">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por descrição ou categoria"
          className="pl-10"
        />
      </div>

      <Select
        value={filter}
        onChange={(event) =>
          onFilterChange(event.target.value as TransactionFilter)
        }
      >
        <option value="all">Todas</option>
        <option value="income">Receitas</option>
        <option value="expense">Despesas</option>
      </Select>
    </div>
  );
}
