import { X } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

type ModalProps = PropsWithChildren<{
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  footer?: ReactNode;
}>;

export function Modal({
  open,
  title,
  description,
  onClose,
  footer,
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-[28px] bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-500 transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Fechar modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer ? (
          <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
