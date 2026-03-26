import { Button } from "./button";
import { Modal } from "./modal";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      description={description}
      onClose={onCancel}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onCancel}>
            {cancelText}
          </Button>
          <Button variant="danger" type="button" onClick={onConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Essa ação não poderá ser desfeita.
      </p>
    </Modal>
  );
}
