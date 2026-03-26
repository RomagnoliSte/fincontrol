import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export function Select({ className, hasError = false, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
        "focus:border-emerald-500 dark:bg-zinc-900 dark:text-zinc-100",
        hasError
          ? "border-red-500 focus:border-red-500"
          : "border-zinc-200 dark:border-zinc-700",
        className,
      )}
      {...props}
    />
  );
}
