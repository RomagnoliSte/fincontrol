import { Wallet } from "lucide-react";
import { ThemeToggle } from "../finance/theme-toggle";

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white">
          <Wallet className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Minhas Finanças
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Organize seu dinheiro de forma simples
          </p>
        </div>
      </div>

      <ThemeToggle />
    </header>
  );
}
