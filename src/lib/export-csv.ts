import Papa from "papaparse";
import type { Transaction } from "../types/transaction";

function getTransactionTypeLabel(type: Transaction["type"]) {
  return type === "income" ? "Receita" : "Despesa";
}

export function exportTransactionsToCsv(transactions: Transaction[]) {
  const rows = transactions.map((transaction) => ({
    descricao: transaction.title,
    categoria: transaction.category,
    tipo: getTransactionTypeLabel(transaction.type),
    valor: transaction.amount.toFixed(2).replace(".", ","),
    data: transaction.date,
  }));

  const csv = Papa.unparse(rows, {
    delimiter: ";",
  });

  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "fincontrol-transacoes.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
