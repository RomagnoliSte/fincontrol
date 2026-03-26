import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TransactionsList } from "./transactions-list";
import type { Transaction } from "../../types/transaction";

const transactions: Transaction[] = [
  {
    id: "1",
    title: "Salário extra",
    category: "Salário",
    amount: 5000,
    date: "01 de mar.",
    type: "income",
  },
  {
    id: "2",
    title: "Supermercado",
    category: "Alimentação",
    amount: 200,
    date: "02 de mar.",
    type: "expense",
  },
];

describe("TransactionsList", () => {
  it("renderiza as transações recebidas", () => {
    render(
      <TransactionsList
        transactions={transactions}
        allTransactions={transactions}
        onEditTransaction={vi.fn()}
        onDeleteTransaction={vi.fn()}
        search=""
        onSearchChange={vi.fn()}
        filter="all"
        onFilterChange={vi.fn()}
      />,
    );

    expect(screen.getByText("Salário extra")).toBeInTheDocument();
    expect(screen.getByText("Supermercado")).toBeInTheDocument();
  });

  it("chama onSearchChange ao digitar na busca", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(
      <TransactionsList
        transactions={transactions}
        allTransactions={transactions}
        onEditTransaction={vi.fn()}
        onDeleteTransaction={vi.fn()}
        search=""
        onSearchChange={onSearchChange}
        filter="all"
        onFilterChange={vi.fn()}
      />,
    );

    await user.type(
      screen.getByPlaceholderText(/buscar por descrição ou categoria/i),
      "mercado",
    );

    expect(onSearchChange).toHaveBeenCalled();
  });
});
