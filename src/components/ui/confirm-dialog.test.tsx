import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "./confirm-dialog";

describe("ConfirmDialog", () => {
  it("confirma a exclusão", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ConfirmDialog
        open
        title="Excluir transação"
        description="Deseja excluir?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /confirmar|excluir/i }),
    );

    expect(onConfirm).toHaveBeenCalled();
  });

  it("cancela a exclusão", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(
      <ConfirmDialog
        open
        title="Excluir transação"
        description="Deseja excluir?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(onCancel).toHaveBeenCalled();
    expect(onConfirm).not.toHaveBeenCalled();
  });
});
