import type { PropsWithChildren } from "react";
import { Card } from "./card";

type EmptyStateProps = PropsWithChildren<{
  title: string;
  description: string;
}>;

export function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <Card className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-700">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {description}
      </p>

      {children ? <div className="mt-4">{children}</div> : null}
    </Card>
  );
}
