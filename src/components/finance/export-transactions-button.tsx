import { Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { exportTransactionsToCsv } from "../../lib/export-csv";
import type { Transaction } from "../../types/transaction";

type ExportTransactionsButtonProps = {
  transactions: Transaction[];
};

export function ExportTransactionsButton({
  transactions,
}: ExportTransactionsButtonProps) {
  function handleExport() {
    if (transactions.length === 0) {
      toast.error("Não há transações para exportar.");
      return;
    }

    exportTransactionsToCsv(transactions);
    toast.success("CSV exportado com sucesso.");
  }

  return (
    <Button variant="secondary" type="button" onClick={handleExport}>
      <Download className="mr-2 h-4 w-4" />
      Exportar CSV
    </Button>
  );
}
