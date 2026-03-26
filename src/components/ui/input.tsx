import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export function Input({ className, hasError = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition",
        "placeholder:text-zinc-400 focus:border-emerald-500",
        "dark:bg-zinc-900 dark:text-zinc-100",
        hasError
          ? "border-red-500 focus:border-red-500"
          : "border-zinc-200 dark:border-zinc-700",
        className,
      )}
      {...props}
    />
  );
}
