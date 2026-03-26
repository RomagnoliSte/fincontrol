import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { exportTransactionsToCsv } from "./export-csv";
import type { Transaction } from "../types/transaction";

describe("exportTransactionsToCsv", () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      title: "Salário",
      category: "Salário",
      amount: 5000,
      date: "01 de mar.",
      type: "income",
    },
  ];

  const createObjectURLMock = vi.fn(() => "blob:mock-url");
  const revokeObjectURLMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("gera o download do arquivo csv", () => {
    const clickMock = vi.fn();
    const appendChildSpy = vi.spyOn(document.body, "appendChild");
    const removeChildSpy = vi.spyOn(document.body, "removeChild");

    const realCreateElement = document.createElement.bind(document);

    vi.spyOn(document, "createElement").mockImplementation(
      (tagName: string) => {
        const element = realCreateElement(tagName);

        if (tagName === "a") {
          element.click = clickMock;
        }

        return element;
      },
    );

    exportTransactionsToCsv(transactions);

    expect(createObjectURLMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(appendChildSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:mock-url");
  });
});
