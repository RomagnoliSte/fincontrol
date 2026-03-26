import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { HomePage } from "./home";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("HomePage flow", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adiciona, edita e exclui uma transação", async () => {
    const user = userEvent.setup();

    render(<HomePage />);

    const descriptionInput = screen.getByLabelText(/descrição/i);
    const amountInput = screen.getByLabelText(/valor/i);
    const categorySelect = screen.getByLabelText(/categoria/i);

    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Padaria");

    await user.clear(amountInput);
    await user.type(amountInput, "10");
    await user.tab();

    await user.selectOptions(categorySelect, "Alimentação");
    await user.click(screen.getByRole("button", { name: /^adicionar$/i }));

    expect(await screen.findByText("Padaria")).toBeInTheDocument();

    const padariaItem = screen.getByText("Padaria").closest("div");

    expect(padariaItem).toBeTruthy();

    await user.click(screen.getByRole("button", { name: /editar padaria/i }));

    const modalDescriptionInput = await screen.findByDisplayValue("Padaria");
    const modalAmountInput = screen.getByDisplayValue("10,00");

    await user.clear(modalDescriptionInput);
    await user.type(modalDescriptionInput, "Padaria do bairro");

    await user.clear(modalAmountInput);
    await user.type(modalAmountInput, "15");
    await user.tab();

    await user.click(
      screen.getByRole("button", { name: /salvar alterações/i }),
    );

    expect(await screen.findByText("Padaria do bairro")).toBeInTheDocument();
    expect(screen.queryByText("Padaria")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /excluir padaria do bairro/i }),
    );

    expect(
      await screen.findByText(/essa ação não poderá ser desfeita/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^excluir$/i }));

    await waitFor(() => {
      expect(screen.queryByText("Padaria do bairro")).not.toBeInTheDocument();
    });
  });
});
